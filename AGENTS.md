# Project Conventions & Agent Guidelines

This file is the single source of truth for repository conventions, formatting, and operational memory. Any AI agent operating within this repository must adhere strictly to these directives.

## Tooling & Constraints
- **Mise First:** `mise` is used for all task execution and tool versioning. `mise` is non-negotiable. Tools defined in `mise.toml` must be pinned to specific versions; `latest`, `lts`, or floating versions are prohibited.
- **Node.js:** The project relies on the native Node.js test runner (`node --test`) for unit tests. No other testing framework should be introduced unless explicitly requested.

## Error Handling
- **Centralized Error Reporting:** The project uses a single, centralized error-reporting function for all unexpected errors. All unhandled exceptions must funnel through this function.
- **Direct Calls Prohibited:** Direct calls to `console.error` or `Sentry.captureException` at call sites are strictly prohibited.

## Operational Memory (Where Things Live)
- `src/core/errors/errorReporter.js` -> Centralized error handling and reporting facade.
