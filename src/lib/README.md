# Backend Logging & Configuration System

This directory contains the centralized logging and configuration utilities for the application. All backend components should use these utilities for consistent logging and configuration management.

## 📁 Files Overview

- **`logger.ts`** - Core logging utility with structured logging support
- **`request-context.ts`** - Request context management with correlation IDs
- **`config.ts`** - Centralized configuration management with validation
- **`supabase/`** - Supabase client utilities (already integrated with logging)

## 🚀 Quick Start

### 1. Basic Logging

```typescript
import { logger } from '@/lib/logger';

// Simple logging
logger.info('Application started');
logger.error('Database connection failed', new Error('Connection timeout'));

// Contextual logging
logger.authEvent('User login successful', {
  userId: 'user123',
  userRole: 'admin'
});
```

### 2. Request Context

```typescript
import { requestContext } from '@/lib/request-context';

// In middleware or API routes
const context = requestContext.createLogContext();
logger.info('Processing request', context);

// Automatic request tracking (in middleware)
requestContext.logRequestStart('GET', '/api/users');
requestContext.logRequestEnd('GET', '/api/users', 200);
```

### 3. Configuration

```typescript
import { config } from '@/lib/config';

// Access configuration
console.log(`App: ${config.app.name} v${config.app.version}`);
console.log(`Supabase URL: ${config.supabase.url}`);
```

## 🔧 Environment Variables

### Required Variables

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Optional Logging Variables

```bash
# Core Logging Configuration
LOG_LEVEL=info                    # Log level: debug, info, warn, error, silent
LOG_MODE=both                     # Environment mode: dev, prod, both, none

# Feature-Specific Logging Controls
ENABLE_REQUEST_LOGGING=true       # API request/response logging
ENABLE_PERFORMANCE_LOGGING=true   # Performance timing logs
ENABLE_SECURITY_LOGGING=true      # Security event logging
ENABLE_AUTH_LOGGING=true          # Authentication event logging

# Application Configuration
APP_NAME="Your App Name"          # Application name for logs
APP_VERSION="1.0.0"               # Application version for logs
```

### Log Level Details

| Level | Description | Use Case |
|-------|-------------|----------|
| `debug` | Detailed debugging information | Development troubleshooting |
| `info` | General application flow | Normal operations, important events |
| `warn` | Warning messages | Potential issues, deprecated features |
| `error` | Error conditions | Failures that don't stop the app |
| `silent` | No logging | Completely disable all logs |

### Log Mode Details

| Mode | Behavior | Best For |
|------|----------|----------|
| `dev` | Logging only in development | Local development |
| `prod` | Logging only in production | Production environments |
| `both` | Logging in all environments | Most applications |
| `none` | All logging disabled | Disable for performance |

### Feature Flag Details

| Variable | Controls | Default | Impact |
|----------|----------|---------|---------|
| `ENABLE_REQUEST_LOGGING` | API request/response logs | `true` | High volume, useful for debugging |
| `ENABLE_PERFORMANCE_LOGGING` | Operation timing logs | `true` | Low volume, performance monitoring |
| `ENABLE_SECURITY_LOGGING` | Security event logs | `true` | Critical, security monitoring |
| `ENABLE_AUTH_LOGGING` | Authentication logs | `true` | Important, access tracking |

### Logging Mode Options

- **`dev`**: Logging enabled only in development environment
- **`prod`**: Logging enabled only in production environment
- **`both`**: Logging enabled in both environments (default)
- **`none`**: All logging completely disabled (sets level to 'silent')

### Example Configurations

```bash
# Development with full logging (default)
NODE_ENV=development
LOG_LEVEL=debug
LOG_MODE=both

# Production with minimal logging
NODE_ENV=production
LOG_LEVEL=warn
LOG_MODE=prod
ENABLE_REQUEST_LOGGING=false
ENABLE_AUTH_LOGGING=false

# Completely disable all logging
LOG_MODE=none

# Development-only logging
LOG_MODE=dev
LOG_LEVEL=debug

# Production-only logging
LOG_MODE=prod
LOG_LEVEL=info
```

### Vercel Setup

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add the variables listed above
4. Redeploy your application

## 📝 Usage Examples

### In Middleware

```typescript
// src/lib/supabase/middleware.ts
import { requestContext, generateRequestId, createRequestContext } from '../request-context';

export async function middleware(request: NextRequest) {
  const requestId = generateRequestId();
  const context = createRequestContext(requestId, request);

  return requestContext.run(context, async () => {
    requestContext.logRequestStart(request.method, request.nextUrl.pathname);

    try {
      // Your middleware logic
      const result = await processRequest(request);

      requestContext.logRequestEnd(request.method, request.nextUrl.pathname, 200);
      return result;
    } catch (error) {
      requestContext.logError(error as Error);
      return NextResponse.error();
    }
  });
}
```

### In API Routes

```typescript
// src/app/api/users/route.ts
import { requestContext } from '@/lib/request-context';
import { logger } from '@/lib/logger';

export async function GET() {
  const startTime = Date.now();

  try {
    // Your API logic
    const users = await getUsers();

    requestContext.logPerformance('getUsers', Date.now() - startTime);
    logger.info('Users retrieved successfully', requestContext.createLogContext());

    return Response.json(users);
  } catch (error) {
    requestContext.logError(error as Error, 'Failed to retrieve users');
    return Response.error();
  }
}
```

### In Server Components

```typescript
// src/app/dashboard/page.tsx
import { logger } from '@/lib/logger';
import { requestContext } from '@/lib/request-context';

export default async function DashboardPage() {
  logger.info('Dashboard page accessed', requestContext.createLogContext());

  // Your component logic
  return <div>Dashboard Content</div>;
}
```

## 🔍 Log Levels

- **DEBUG**: Detailed debugging information
- **INFO**: General information about application flow
- **WARN**: Warning messages for potential issues
- **ERROR**: Error conditions that don't stop the application
- **NONE**: Disable all logging

## 🎯 Specialized Logging Methods

### Authentication Events
```typescript
logger.authEvent('User logged in successfully');
logger.securityEvent('Suspicious login attempt detected');
```

### Database Operations
```typescript
logger.dbOperation('SELECT', 'users');
logger.dbOperation('INSERT', 'user_sessions');
```

### API Requests
```typescript
logger.apiRequest('GET', '/api/users', 200);
logger.apiRequest('POST', '/api/users', 400); // Automatically logs as warning
```

### Performance Tracking
```typescript
const startTime = Date.now();
// ... operation
logger.performance('databaseQuery', Date.now() - startTime);
```

## 🏗️ Architecture

### Logger Class
- Environment-aware formatting (pretty dev, JSON prod)
- Configurable log levels
- Structured logging with context
- TypeScript support with full type safety

### Request Context
- Correlation ID generation and tracking
- AsyncLocalStorage for context propagation
- Automatic request timing and metrics
- User context management

### Configuration
- Environment variable validation
- Centralized configuration object
- Runtime configuration validation
- Type-safe configuration access

## 🐛 Troubleshooting

### Common Issues

1. **"Module not found" errors**
   - Ensure correct import paths
   - Check if files exist in the lib directory

2. **Logging not appearing**
   - Check LOG_LEVEL environment variable
   - Verify configuration loading

3. **Request context not working**
   - Ensure middleware is properly configured
   - Check if AsyncLocalStorage is supported in your environment

### Debug Mode

Set `LOG_LEVEL=DEBUG` and `NODE_ENV=development` for verbose logging:

```bash
LOG_LEVEL=DEBUG
NODE_ENV=development
```

## 📊 Monitoring & Observability

### Log Analysis
- Use structured JSON logs for log aggregation services
- Include correlation IDs for request tracing
- Add custom metadata for business logic tracking

### Performance Monitoring
- Enable `ENABLE_PERFORMANCE_LOGGING=true`
- Use correlation IDs to trace request performance
- Monitor database operation times

### Error Tracking
- All errors include stack traces in development
- Structured error logging for production monitoring
- Automatic error context capture

## 🔒 Security Considerations

- Never log sensitive information (passwords, API keys)
- Use security event logging for authentication failures
- Sanitize user inputs before logging
- Consider log encryption for production deployments

## 🚀 Best Practices

1. **Use appropriate log levels**: DEBUG for development, INFO/WARN/ERROR for production
2. **Include context**: Always provide relevant context with your logs
3. **Handle errors properly**: Use the error logging methods for exceptions
4. **Performance awareness**: Logging is synchronous, avoid excessive logging in hot paths
5. **Consistent naming**: Use the specialized logging methods when applicable

## 📚 Migration Guide

### From console.log

```typescript
// Before
console.log('User created:', user.id);
console.error('Database error:', error);

// After
logger.info('User created successfully', { userId: user.id });
logger.error('Database operation failed', error, { operation: 'createUser' });
```

### Adding Request Context

```typescript
// Before
logger.info('Processing request');

// After
logger.info('Processing request', requestContext.createLogContext());
```

This logging system provides a solid foundation for observability, debugging, and monitoring across your entire backend infrastructure.
