# Project Agents & Conventions

This file documents the conventions and rules for agents and contributors working on this project. It serves as the single source of truth for project standards.

## 1. Mission

The goal is to maintain high-quality code and documentation. We value clarity, precision, and essentialism.

## 2. Tooling: `mise`

**Mise is mandatory.**

- All task execution must be done via `mise`.
- Tools must be pinned to specific versions in `mise.toml`. **Never** use `latest`, `lts`, or floating versions.
- Do not downgrade dependencies unless explicitly asked.

To install `mise`:

```sh
curl https://mise.run | sh
```

To use tools:

```sh
mise exec -- <command>
# or
mise run <task>
```

## 3. Documentation Standards

### Philosophy

- **Essentialism**: Only write necessary comments.
- **Value-Driven**: Focus on non-obvious details (why, nuance, side effects).
- **Onboarding-Friendly**: Explain the flow and architecture.
- **Source of Truth**: Ensure docs match the current code.

### Rules

- Use standard JSDoc/TSDoc format (`/** ... */`).
- Avoid line comments (`//`) unless inside function bodies for specific instructions.
- **NO OBVIOUS COMMENTS**: e.g., don't say "Returns user" for `getUser`. Say "Retrieves cached user, fallback to DB".
- Do not comment out code ("ghost comments").

## 4. Error Handling

**Centralized Reporting is Mandatory.**

- All unexpected errors must flow through a centralized reporting function (e.g., `reportError`).
- Never call `console.error` or `Sentry.captureException` directly at the call site.
- **No silent failures**: Every `catch` block must report the error.

## 5. Workflow

1.  **Detect Drift**: Fix outdated docs first.
2.  **Fill Gaps**: Add missing docs to exported functions/classes. Scope: ONE cohesive area per PR.
3.  **Retroactive Violations**: Fix existing violations of these rules before starting new work.
4.  **Test Beyond Automation**: Verify changes manually where possible.

## 6. Project Structure

- **Root**: Configuration and documentation.
- **Code**: (To be populated) - Maintain separation of concerns.

---

Created by Docs Agent
