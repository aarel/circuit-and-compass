# Repository Guidelines

## Project Structure & Module Organization
- Root holds prompt playbooks: `project_development.tasks` (side hustle project architect workflow) and `content-creation.task` (SEO blogging workflow). Keep new prompt specs alongside them with clear, hyphenated names.
- No build artifacts or binaries should be committed; this repo is text-first. Keep outputs in separate repos; store only reusable instructions here.
- When expanding, prefer simple folders (e.g., `docs/` for guidance, `archive/` for retired prompts) and update references.

## Build, Test, and Development Commands
- No build pipeline exists. Validate edits locally with basic tooling: `wc -w AGENTS.md` to confirm length, `md5sum` for checks if needed.
- Optional lint: run `markdownlint *.md` (or `markdownlint **/*.md`) if you have the CLI installed to catch heading/order issues.
- Use plain POSIX commands (`cat`, `diff`, `rg`) for review; avoid commands that fetch or install dependencies unless necessary.

## Coding Style & Naming Conventions
- Markdown: start files with an H1, use `##` for sections, bullets over long paragraphs, and keep lines under ~100 chars when practical.
- Tone: instructional, direct, and repository-specific; avoid generic AI boilerplate.
- File naming: use lowercase-hyphenated tokens ending in `.task` for prompt specs, `.md` for docs; avoid spaces and version numbers in filenames.

## Testing Guidelines
- Proofread for ambiguity and conflicting directives; ensure task lists are ordered and stop conditions are explicit.
- If you adjust a `.task` flow, dry-run it mentally end-to-end and add brief examples for ambiguous steps.
- After edits, skim with `markdownlint` (if available) and check for accidental secrets or personal data.

## Commit & Pull Request Guidelines
- Use small, scoped commits with imperative messages; Conventional Commits fit well (e.g., `docs: add agent guidelines`).
- PRs should include a short summary, why the change matters, any manual checks (lint/proofread), and affected files.
- Note any deviations from established instructions in the description and request reviewers to validate task logic.

## Security & Configuration Notes
- Do not include credentials, API keys, or private data in prompt examples. Use placeholders and call out required secrets explicitly.
- Keep tooling offline-friendly; note when a step needs network access so reviewers can run it consciously.
