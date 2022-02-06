# Thinreports Section Editor

[![Test](https://github.com/thinreports/thinreports-section-editor/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/thinreports/thinreports-section-editor/actions/workflows/test.yml)

An editor for editing a [section format](https://github.com/thinreports/thinreports/blob/main/getting-started/section-format.md) template.

## Current Status

Under development

## Prerequisites

- Node.js >= 14.0
- npm >= 6.0

## Installation

There is currently no production version package available. If you want to use the Section Editor, you will need to build and run the development version.

```
npm i
npm run electron:serve
```

## Development

See `npx vue-cli-service help` for other available commands.

### Running tests

```
npm run test:unit
```

### Running lint

```
npm run lint
```

Or if you don't want auto-correct:

```
npm run test:lint
```

### Building the app for production

```
npm run build
```

### Building the package for production

```
npm run electron:build
```
