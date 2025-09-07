# finances_tracker

Monorepo for personal finance tracker using pnpm and Turborepo.

## CI Status

![CI](https://github.com/Kushikime/finances_tracker/actions/workflows/ci.yml/badge.svg)

## Getting Started

### Install dependencies

```sh
pnpm install
```

### Run both apps in development

```sh
pnpm dev
```

This starts both API (NestJS) and Web (Vite+React) dev servers in parallel.

Or, run each app separately:

```sh
pnpm --filter api dev
pnpm --filter web dev
```

### Build all apps

```sh
pnpm build
```

Builds both API and Web to their respective `dist/` folders.
