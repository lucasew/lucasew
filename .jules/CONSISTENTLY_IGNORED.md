## IGNORE: Converting README.md HTML to Markdown

**- Pattern:** Replacing inline HTML tags with standard Markdown syntax in the README.
**- Justification:** These changes are consistently rejected, indicating the HTML is intentionally used for specific layout and alignment (e.g., center alignment and shield grids).
**- Files Affected:** `README.md`

## IGNORE: Committing Tooling or Bootstrap Artifacts

**- Pattern:** Committing bootstrap scripts, downloaded binaries, or temporary tooling installers like `install-mise.sh`.
**- Justification:** Setup scripts and temporary artifacts should be executed on the fly or added to `.gitignore`, not checked into version control.
**- Files Affected:** `install-mise.sh`, tooling binaries

## IGNORE: Reimplementing Centralized Error Reporting

**- Pattern:** Creating a new centralized error reporting facade, repeatedly updating docstrings for it, or moving its location (e.g., to `src/core/errorReporter.js`).
**- Justification:** Redundant duplication of pending/existing work. The error reporter is already specified to reside at `src/core/errors/errorReporter.js` and additional boilerplate PRs for it are being closed.
**- Files Affected:** `src/core/errorReporter.js`, `src/core/errors/errorReporter.js`, `tests/errorReporter.test.js`

## IGNORE: Initializing Sparse Directories with Boilerplate

**- Pattern:** Creating standard framework directories (like Hugo's `content/`, `layouts/`, `static/`) and populating them with `.gitkeep` files.
**- Justification:** Pre-emptively creating sparse directory structures with placeholder files is treated as unnecessary boilerplate and rejected.
**- Files Affected:** `archetypes/.gitkeep`, `content/.gitkeep`, `data/.gitkeep`, `layouts/.gitkeep`, `static/.gitkeep`, `themes/.gitkeep`
