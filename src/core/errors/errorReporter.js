/**
 * Centralized error reporting utility.
 * Applies the Facade Pattern (GoF) to isolate the application from the underlying error reporting mechanism.
 * Adheres to the Single Responsibility Principle (SRP) by encapsulating error handling.
 */

// Simulating Sentry availability
let sentryClient = null;

export function initializeSentry(client) {
  sentryClient = client;
}

function sanitizeContext(context) {
  if (!context || typeof context !== 'object') {
    return context;
  }

  const sensitiveKeys = ['password', 'secret', 'token', 'key', 'auth', 'credentials'];

  const sanitized = Array.isArray(context) ? [] : {};

  for (const [key, value] of Object.entries(context)) {
    const isSensitive = sensitiveKeys.some(sk => key.toLowerCase().includes(sk));

    if (isSensitive) {
      sanitized[key] = '[REDACTED]';
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeContext(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

export function reportError(error, context = {}) {
  const safeContext = sanitizeContext(context);

  if (sentryClient && typeof sentryClient.captureException === 'function') {
    sentryClient.captureException(error, { extra: safeContext });
  } else {
    // Context-rich logging as a fallback
    const logData = {
      message: error.message || error,
      stack: error.stack || 'No stack trace available',
      context: safeContext,
      timestamp: new Date().toISOString()
    };
    // We intentionally disable the linting for this one specific facade console log
    // eslint-disable-next-line no-console
    console.error(`[CRITICAL ERROR]: ${JSON.stringify(logData, null, 2)}`);
  }
}
