# Thinreports Section Editor

[![Test](https://github.com/thinreports/thinreports-section-editor/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/thinreports/thinreports-section-editor/actions/workflows/test.yml)

A template editor for [Thinreports](https://github.com/thinreports/thinreports) to edit [Section Format](https://github.com/thinreports/thinreports/blob/main/getting-started/section-format.md) templates.

## Current Status

Under development for [v1.0.0](https://github.com/thinreports/thinreports/issues/25).

## Installation

Currently, you can only use the v1.0.0 development version package.
Please download the package from [the v1.0.0-dev release page](https://github.com/thinreports/thinreports-section-editor/releases/tag/v1.0.0-dev).

## Development

### Prerequisites

- Node.js >= 16.0
- npm >= 8.0

### Setting up

```
npm install
```

### Launching the package for development

```
npm run electron:serve
```

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
