/**
 * Request Context Utilities for Logging and Tracing
 *
 * Provides correlation IDs, request tracking, and context propagation
 * across middleware, API routes, and server components.
 */

import { logger } from './logger';
import { User } from '@supabase/supabase-js';

// Define LogContext interface here to avoid circular imports
export interface LogContext {
  requestId?: string;
  userId?: string;
  userRole?: string;
  operation?: string;
  duration?: number;
  metadata?: Record<string, unknown>;
  error?: Error | string;
  category?: string;
  method?: string;
  path?: string;
  statusCode?: number;
  table?: string;
  [key: string]: unknown; // Allow additional properties
}

// Store request context in AsyncLocalStorage for the current request
import { AsyncLocalStorage } from 'async_hooks';

export interface RequestContext {
  requestId: string;
  userId?: string;
  userRole?: string;
  userAgent?: string;
  ip?: string;
  method?: string;
  path?: string;
  startTime: number;
  metadata?: Record<string, unknown>;
}

class RequestContextStore {
  private storage = new AsyncLocalStorage<RequestContext>();

  run<R>(context: RequestContext, callback: () => R): R {
    return this.storage.run(context, callback);
  }

  get(): RequestContext | undefined {
    return this.storage.getStore();
  }

  set(context: Partial<RequestContext>): void {
    const current = this.get();
    if (current) {
      Object.assign(current, context);
    }
  }

  getRequestId(): string {
    return this.get()?.requestId || 'unknown';
  }

  getUserId(): string | undefined {
    return this.get()?.userId;
  }

  getUserRole(): string | undefined {
    return this.get()?.userRole;
  }

  getDuration(): number {
    const startTime = this.get()?.startTime;
    return startTime ? Date.now() - startTime : 0;
  }

  createLogContext(additionalContext?: LogContext): LogContext {
    const request = this.get();
    if (!request) return additionalContext || {};

    return {
      requestId: request.requestId,
      userId: request.userId,
      userRole: request.userRole,
      operation: request.method && request.path ? `${request.method} ${request.path}` : undefined,
      ...additionalContext,
    };
  }

  logRequestStart(method: string, path: string): void {
    this.createLogContext({ operation: `${method} ${path}` });
    logger.apiRequest(method, path); // This will respect the request logging flag
  }

  logRequestEnd(method: string, path: string, statusCode?: number): void {
    const duration = this.getDuration();
    this.createLogContext({
      operation: `${method} ${path}`,
      duration
    });

    logger.apiRequest(method, path, statusCode); // This will respect the request logging flag
  }

  logAuthEvent(message: string): void {
    const context = this.createLogContext();
    logger.authEvent(message, context);
  }

  logSecurityEvent(message: string): void {
    const context = this.createLogContext();
    logger.securityEvent(message, context);
  }

  logError(error: Error, message?: string): void {
    const context = this.createLogContext();
    logger.error(message || error.message, error, context);
  }

  logPerformance(operation: string): void {
    const duration = this.getDuration();
    const context = this.createLogContext({ operation });
    logger.performance(operation, duration, context);
  }
}

// Global instance
export const requestContext = new RequestContextStore();

// Utility functions
export function generateRequestId(): string {
  return crypto.randomUUID();
}

export function createRequestContext(
  requestId: string,
  request?: Request,
  additionalData?: Partial<RequestContext>
): RequestContext {
  const headers = request?.headers;
  const url = request ? new URL(request.url) : undefined;

  return {
    requestId,
    userAgent: headers?.get('user-agent') || undefined,
    ip: headers?.get('x-forwarded-for') || headers?.get('x-real-ip') || undefined,
    method: request?.method,
    path: url?.pathname,
    startTime: Date.now(),
    ...additionalData,
  };
}

export function extractUserFromSupabaseUser(user: User | null): { userId?: string; userRole?: string } {
  if (!user) return {};

  return {
    userId: user.id,
    userRole: user.user_metadata?.role || user.role,
  };
}

// Middleware helper
export function withRequestContext<T extends unknown[]>(
  handler: (...args: T) => Promise<Response> | Response,
  request?: Request
) {
  return (...args: T): Promise<Response> | Response => {
    const requestId = generateRequestId();
    const context = createRequestContext(requestId, request);

    return requestContext.run(context, () => {
      // Log request start
      if (request) {
        requestContext.logRequestStart(request.method, new URL(request.url).pathname);
      }

      try {
        const result = handler(...args);

        // Log request end for synchronous responses
        if (result instanceof Response && request) {
          requestContext.logRequestEnd(request.method, new URL(request.url).pathname, result.status);
        }

        return result;
      } catch (error) {
        // Log errors
        if (error instanceof Error) {
          requestContext.logError(error, 'Unhandled error in request handler');
        }
        throw error;
      }
    });
  };
}

export default requestContext;
