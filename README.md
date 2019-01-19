# Frontbend [![Build Status](https://travis-ci.org/edekadigital/frontbend.svg?branch=master)](https://travis-ci.org/edekadigital/frontbend)

## Intro

**Frontbend** is a tool that automates the analysis of image dimensions accross various breakpoints.

## Node

### Install

```
npm install --save-dev frontbend
```

### Usage

```js
const path = require('path');
const fs = require('fs');
const frontbend = require('frontbend');

const configFile = path.resolve(__dirname, 'config.json');
const outputDir = path.resolve(__dirname, 'output');
const config = JSON.parse(fs.readFileSync(configFile, 'utf8'));

frontbend
  .analyze(config)
  .then(result => frontbend.writeResult(result, outputDir));
```

### API

```js
const frontbend = require('frontbend');
```

#### `frontbend.analyze(config [, options])`

**Options:**

| Option | Default value | Description                                                                                    |
| ------ | ------------- | ---------------------------------------------------------------------------------------------- |
| `open` | `false`       | Run in full version of Chromium. By default, **frontbend** launches Chromium in headless mode. |

#### `frontbend.writeResult(result [, options])`

**Options:**

| Option  | Default value | Description                                           |
| ------- | ------------- | ----------------------------------------------------- |
| `clean` | `false`       | Delete output directory before running **frontbend**. |

## CLI

```
npx frontbend ./my/config.json ./my/output/ [options]
```

or

```
npm install --global frontbend
frontbend ./my/config.json ./my/output/ [options]
```

**Options:**

| Option    | Alias | Default value | Description                                                                                    |
| --------- | ----- | ------------- | ---------------------------------------------------------------------------------------------- |
| `--clean` | `-c`  | `false`       | Delete output directory before running **frontbend**.                                          |
| `--open`  | `-o`  | `false`       | Run in full version of Chromium. By default, **frontbend** launches Chromium in headless mode. |

## Configuration

[See configuration example](https://github.com/edekadigital/frontbend/blob/master/example/config.json)
