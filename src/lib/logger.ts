/**
 * Pino-based Logging Utility for Backend Operations
 *
 * Features:
 * - High-performance logging with Pino
 * - Environment-aware configuration
 * - Structured logging for production
 * - Vercel-optimized for serverless
 * - Request context integration
 */

import pino from 'pino';
import { LogContext } from './request-context';

// Configure Pino based on environment
const getPinoConfig = () => {
  const isDevelopment = process.env.NODE_ENV === 'development';
  const logLevel = process.env.LOG_LEVEL || (isDevelopment ? 'debug' : 'info');

  // Check if logging should be enabled based on environment
  const logMode = process.env.LOG_MODE || 'both';
  if (logMode === 'none') {
    return { level: 'silent' };
  }

  if (logMode === 'dev' && !isDevelopment) {
    return { level: 'silent' };
  }

  if (logMode === 'prod' && isDevelopment) {
    return { level: 'silent' };
  }

  return {
    level: logLevel,
    formatters: {
      level: (label: string) => {
        return { level: label };
      },
    },
    ...(isDevelopment && {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:standard',
          ignore: 'pid,hostname',
        },
      },
    }),
  };
};

// Create Pino logger instance
const pinoLogger = pino(getPinoConfig());

// Enhanced logger with specialized methods
class Logger {
  private logger = pinoLogger;

  debug(message: string, context?: LogContext): void {
    this.logger.debug(context || {}, message);
  }

  info(message: string, context?: LogContext): void {
    this.logger.info(context || {}, message);
  }

  warn(message: string, context?: LogContext): void {
    this.logger.warn(context || {}, message);
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const logContext = { ...context };

    if (error instanceof Error) {
      logContext.error = {
        name: error.name,
        message: error.message,
        stack: error.stack,
      };
    } else if (typeof error === 'string') {
      logContext.error = error;
    } else if (error) {
      logContext.error = JSON.stringify(error);
    }

    this.logger.error(logContext, message);
  }

  // Specialized methods for common backend operations
  authEvent(message: string, context?: LogContext): void {
    if (process.env.ENABLE_AUTH_LOGGING !== 'false') {
      this.logger.info({ ...context, category: 'auth' }, `[AUTH] ${message}`);
    }
  }

  securityEvent(message: string, context?: LogContext): void {
    if (process.env.ENABLE_SECURITY_LOGGING !== 'false') {
      this.logger.warn({ ...context, category: 'security' }, `[SECURITY] ${message}`);
    }
  }

  apiRequest(method: string, path: string, statusCode?: number, context?: LogContext): void {
    if (process.env.ENABLE_REQUEST_LOGGING !== 'false') {
      const logContext = {
        ...context,
        category: 'api',
        method,
        path,
        statusCode,
      };

      if (statusCode && statusCode >= 400) {
        this.logger.warn(logContext, `[API] ${method} ${path} -> ${statusCode}`);
      } else {
        this.logger.info(logContext, `[API] ${method} ${path}${statusCode ? ` -> ${statusCode}` : ''}`);
      }
    }
  }

  performance(operation: string, duration: number, context?: LogContext): void {
    if (process.env.ENABLE_PERFORMANCE_LOGGING !== 'false') {
      this.logger.info({
        ...context,
        category: 'performance',
        operation,
        duration,
      }, `[PERF] ${operation} completed in ${duration}ms`);
    }
  }

  dbOperation(operation: string, table: string, context?: LogContext): void {
    this.logger.debug({
      ...context,
      category: 'database',
      operation,
      table,
    }, `[DB] ${operation} on ${table}`);
  }

  // Context builders for common scenarios
  withRequest(requestId: string, context?: LogContext): LogContext {
    return { ...context, requestId };
  }

  withUser(userId: string, userRole?: string, context?: LogContext): LogContext {
    return { ...context, userId, userRole };
  }

  withOperation(operation: string, context?: LogContext): LogContext {
    return { ...context, operation };
  }
}

// Export singleton instance
export const logger = new Logger();
export { Logger };
export default logger;
