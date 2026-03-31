/**
 * Centralized error reporting utility.
 * Applies the Facade Pattern (GoF) to isolate the application from the underlying error reporting mechanism.
 * Adheres to the Single Responsibility Principle (SRP) by encapsulating error handling.
 */

// Simulating Sentry availability
let sentryClient = null;

/**
 * Injects a Sentry client instance into the module.
 * This function must be called during application bootstrapping if Sentry error tracking is desired.
 *
 * @param {Object|null} client - The Sentry client instance. It expects an object possessing a `captureException` function. Pass `null` to explicitly disable Sentry reporting and fall back to local logging.
 */
export function initializeSentry(client) {
  sentryClient = client;
}

/**
 * Required centralized error handling function.
 * ALL unexpected errors, unhandled rejections, and unrecoverable exceptions must be funneled through this function.
 * Do not call `console.error` or `Sentry.captureException` directly.
 *
 * Flow: If Sentry is initialized, it reports the error with context. Otherwise, it logs a formatted JSON error message.
 *
 * @param {Error|string} error - The error object or message string to report.
 * @param {Object} [context={}] - Additional metadata to append to the error context (e.g., user IDs, request IDs, or operation context).
 */
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
