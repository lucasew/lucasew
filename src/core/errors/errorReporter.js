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

export function reportError(error, context = {}) {
  if (sentryClient && typeof sentryClient.captureException === 'function') {
    sentryClient.captureException(error, { extra: context });
  } else {
    // Context-rich logging as a fallback
    const logData = {
      message: error.message || error,
      stack: error.stack || 'No stack trace available',
      context,
      timestamp: new Date().toISOString()
    };
    // We intentionally disable the linting for this one specific facade console log
    // eslint-disable-next-line no-console
    console.error(`[CRITICAL ERROR]: ${JSON.stringify(logData, null, 2)}`);
  }
}
