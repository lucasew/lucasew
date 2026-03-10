import test from 'node:test';
import assert from 'node:assert';
import { reportError, initializeSentry } from '../src/core/errors/errorReporter.js';

test('reportError without Sentry falls back to console.error', (t) => {
  // Reset sentry client
  initializeSentry(null);

  const originalConsoleError = console.error;
  let loggedMessage = '';
  console.error = (msg) => {
    loggedMessage = msg;
  };

  const testError = new Error('Test Error without Sentry');
  reportError(testError, { userId: 123 });

  assert.ok(loggedMessage.includes('[CRITICAL ERROR]'));
  assert.ok(loggedMessage.includes('Test Error without Sentry'));
  assert.ok(loggedMessage.includes('userId": 123'));

  // Restore
  console.error = originalConsoleError;
});

test('reportError with Sentry calls captureException', (t) => {
  let capturedError = null;
  let capturedContext = null;

  const mockSentry = {
    captureException: (err, context) => {
      capturedError = err;
      capturedContext = context;
    }
  };

  initializeSentry(mockSentry);

  const testError = new Error('Test Error with Sentry');
  reportError(testError, { userId: 456 });

  assert.strictEqual(capturedError.message, 'Test Error with Sentry');
  assert.deepStrictEqual(capturedContext, { extra: { userId: 456 } });
});
