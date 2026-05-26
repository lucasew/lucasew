## IGNORE: Repeated changes to the same file

**- Pattern:** Submitting multiple PRs that attempt to implement the same feature or repeatedly modifying the same core files, such as the centralized error reporter.
**- Justification:** Redundantly duplicating existing, pending work or generating boilerplate for issues already covered by open, mergeable PRs.
**- Files Affected:** `src/core/errors/errorReporter.js`, `tests/errorReporter.test.js`, `mise.toml`, `package.json`

## IGNORE: Specific formatting rules rejected

**- Pattern:** Converting inline HTML to standard Markdown syntax in the README, or enforcing unprompted YAML/Markdown formatting changes.
**- Justification:** The project intentionally uses HTML for specific layouts, and these formatting changes are consistently rejected.
**- Files Affected:** `README.md`, `.jules/janitor.md`, `.prettierrc`, `.markdownlint.yaml`

## IGNORE: False positive vulnerabilities

**- Pattern:** Adding generic dictionary-based sanitization logic to hide sensitive keys in error reporter context/metadata.
**- Justification:** These are treated as false positive security vulnerabilities and are closed without merging.
**- Files Affected:** `src/core/errors/errorReporter.js`, `tests/errorReporter.test.js`

## IGNORE: Committing Tooling Artifacts

**- Pattern:** Committing bootstrap scripts or temporary tooling installers like `install-mise.sh`.
**- Justification:** Execution guardrails forbid modifying `install-mise.sh`. Setup scripts should not be checked into version control.
**- Files Affected:** `install-mise.sh`

## IGNORE: Initializing Sparse Directories

**- Pattern:** Creating standard framework directories (like Hugo's `content/`, `layouts/`, `static/`) and populating them with `.gitkeep` files.
**- Justification:** Pre-emptively creating sparse directory structures with placeholder files is treated as unnecessary boilerplate and rejected.
**- Files Affected:** `archetypes/.gitkeep`, `content/.gitkeep`, `data/.gitkeep`, `layouts/.gitkeep`, `static/.gitkeep`, `themes/.gitkeep`
