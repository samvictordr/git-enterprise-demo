# GitOps-ready Node.js Dependency Viewer

[![CI](https://github.com/samvictordr/git-enterprise-demo/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/samvictordr/git-enterprise-demo/actions/workflows/ci.yml)
[![Pages](https://github.com/samvictordr/git-enterprise-demo/actions/workflows/gh-pages.yml/badge.svg?branch=main)](https://github.com/samvictordr/git-enterprise-demo/actions/workflows/gh-pages.yml)

A minimal, automation-first Node.js project that renders a dependency report (from `package.json`) as a static HTML page. The repository showcases clean Git workflows, GitHub Actions CI/CD, weekly dependency automation, and reproducible development via Nix flakes.

- Live site (GitHub Pages): https://samvictordr.github.io/git-enterprise-demo/
- CI runs: https://github.com/samvictordr/git-enterprise-demo/actions

## Features

- Static dependency report generator (outputs `dist/index.html`)
- Reproducible dev environment with Nix flakes (Node.js 20, git)
- CI on push/PR to validate build (and lint/tests if configured)
- CD to GitHub Pages on `main`
- Dependabot for weekly npm updates
- Consistent line-endings and clean diffs via `.gitattributes` and `.gitignore`

## Project structure

```
.
├── .gitattributes                # Normalize LF endings; treat lockfiles as binary
├── .gitignore                    # Ignore node_modules, logs, env files, system files
├── .github/
│   ├── dependabot.yml            # Weekly npm update PRs (deps with scope in message)
│   └── workflows/
│       ├── ci.yml               # CI: Node 20, install, optional lint, placeholder tests
│       └── gh-pages.yml         # CD: build and deploy ./dist to GitHub Pages
├── flake.nix                     # Nix flake: devShell with Node 20 and git
├── flake.lock                    # Pinned Nix inputs for reproducibility
├── package.json                  # Scripts and dependencies
├── README.md                     # You are here
└── src/
    └── index.js                  # Dependency-to-HTML generator

# Generated at build (not committed):
# dist/
#   └── index.html                # Static dependency report
```

## What the app does

The script at `src/index.js`:
- Reads `package.json` dependency versions
- Prints a console banner
- Generates `dist/index.html` with a timestamped table of dependencies

Libraries used:
- `chalk` (colored output), `figlet` (ASCII banner)
- `dayjs` (timestamp), `lodash` (iteration helpers)

## Why Nix flakes (flake.nix / flake.lock)

Nix flakes provide a reproducible, portable dev environment:
- Deterministic: `flake.lock` pins exact versions of the Nix inputs (`nixpkgs`, `flake-utils`)
- Cross-platform: same Node.js version (20) across Linux/macOS (and in CI)
- Ephemeral: no global installs, clean environments per-shell
- Onboarding: one command to get started, no manual Node setup

Dev shell definition (from `flake.nix`):
- Installs `nodejs_20` and `git`
- Prints a quick hint on entry

Use it with:
- `nix develop` to enter the environment
- Then run `npm install`, `npm run dev`, `npm run build`

Tip: If you use `direnv`, add `use flake` to `.envrc` for automatic activation.

## Getting started

Choose one of the two paths:

- With system Node.js 20+
  - `npm install`
  - `npm run dev` (watch mode) or `npm run build`
  - Open `dist/index.html` in a browser

- With Nix flakes
  - `nix develop`
  - `npm install`
  - `npm run dev` or `npm run build`
  - Open `dist/index.html`

Scripts:
- `npm start` – run once
- `npm run dev` – watch with `nodemon`
- `npm run build` – write static site to `dist/`
- `npm test` – placeholder (exits 0)

## CI/CD

- Continuous Integration: `.github/workflows/ci.yml`
  - Trigger: push/PR to `main` and `dev`
  - Environment: Node 20 with npm cache
  - Steps: install deps → `eslint` if present → `npm test` (placeholder)
  - Check status: Actions tab → Node.js CI → latest run
    - Direct link: https://github.com/samvictordr/git-enterprise-demo/actions/workflows/ci.yml

- Continuous Deployment: `.github/workflows/gh-pages.yml`
  - Trigger: push to `main`
  - Steps: install → build → publish `./dist` via `peaceiris/actions-gh-pages`
  - Live site: https://samvictordr.github.io/git-enterprise-demo/
  - Verify: Actions tab → Deploy to GitHub Pages → latest run
    - Direct link: https://github.com/samvictordr/git-enterprise-demo/actions/workflows/gh-pages.yml

## Git workflow (recommended)

- Branches: `main` (stable), `dev` (integration), `feature/*` (short-lived)
- Open PRs from `feature/*` → `dev`, then `dev` → `main`
- Use clear commit messages; tag releases (e.g., `v1.0.0`) on `main`

## Automation & maintenance

- Dependabot (`.github/dependabot.yml`): weekly npm update PRs with `deps(scope)` prefix
- `.gitattributes`: LF endings, cleaner diffs for lockfiles
- `.gitignore`: excludes `node_modules`, logs, env files, etc.

## Extending

- Add ESLint/Prettier configs and enforce in CI
- Add unit tests (and remove the placeholder), add coverage reporting
- Render `devDependencies`, resolve exact install tree, or fetch metadata from npm
- Enhance the HTML report styling or host an index page for multiple reports

## License

MIT
