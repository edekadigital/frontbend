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

### `policies` [object<string, object>]

Use policies in order to define transformations and output quality for images delivered by Akamai Image Manager.

Example:

```json
{
  "policies": {
    "16x9": {
      "transformations": [
        {
          "transformation": "Resize",
          "type": "normal",
          "aspect": "fill",
          "width": 3840,
          "height": 2160
        },
        {
          "gravity": "Center",
          "transformation": "Crop",
          "width": 3840,
          "height": 2160,
          "allowExpansion": false
        }
      ],
      "output": {
        "perceptualQuality": "mediumHigh"
      }
    }
  }
}
```

[Documentation of Akamai Image Manager Policies](https://developer.akamai.com/api/web_performance/image_manager/v2.html#policy)

_Note: The `id` and `breakpoints` fields are added dynamically to the resulting policy files._

### `viewports` [object<string, object>]

Define a set of viewports/breakpoints at which the interface adapts its layout.

Fields:

| Field          | Type      | Default value | Required | Description                                                                                                                                                                 |
| -------------- | --------- | ------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **breakpoint** | `number`  | `undefined`   | yes      | Minimum width (pixel) of viewport                                                                                                                                           |
| **width**      | `number`  | `undefined`   | yes      | Width (pixel) of the reference viewport                                                                                                                                     |
| **fallback**   | `boolean` | `undefined`   | no       | Use as fallback viewport, e.g. for browsers without support for `<picture>`-elements (If no fallback is specified, **Frontbend** will use the largest viewport as fallback) |

Example:

```json
{
  "viewports": {
    "xs": {
      "breakpoint": 0,
      "width": 375
    },
    "s": {
      "breakpoint": 575,
      "width": 768
    },
    "m": {
      "breakpoint": 1024,
      "width": 1200
    },
    "l": {
      "breakpoint": 1440,
      "width": 1600,
      "fallback": true
    },
    "xl": {
      "breakpoint": 1920,
      "width": 1920
    }
  }
}
```

_Note: **Frontbend** follows the mobile-first approach._

### `imageTypes` [object<string, object>]

Provide a set of image types that respond in its own way to different viewport sizes.

| Field               | Type      | Default value | Required | Description                                                                                                                                                                  |
| ------------------- | --------- | ------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **url**             | `string`  | `undefined`   | yes      | Url of page                                                                                                                                                                  |
| **selector**        | `string`  | `undefined`   | yes      | CSS Selector for the image element                                                                                                                                           |
| **credentials**     | `object`  | `null`        | no       | Provide credentials for HTTP authentication                                                                                                                                  |
| **useRelativeUnit** | `boolean` | `true`        | no       | CSS Selector of the image element                                                                                                                                            |
| **retinaScale**     | `number`  | `1.5`         | no       | CSS Selector of the image element                                                                                                                                            |
| **policy**          | `string`  | `'default'`   | no       | Id of policy that should be applied to the image                                                                                                                             |
| **overrides**       | `object`  | `undefined`   | no       | Use the **overrides** object to use a different policy at specific viewports/breakpoints (e.g. when you want to switch to a different aspect ratio for particular viewports) |

Example:

```json
{
  "imageTypes": {
    "stage": {
      "url": "http://localhost:8000/",
      "selector": ".stage__image",
      "credentials": { "username": "USERNAME", "password": "PASSWORD" },
      "policy": "16x9"
    },
    "intro": {
      "url": "http://localhost:8000/",
      "selector": ".intro__image",
      "credentials": { "username": "USERNAME", "password": "PASSWORD" },
      "policy": "1x1",
      "overrides": {
        "xs": {
          "policy": "16x9"
        }
      }
    }
  }
}
```

[See configuration example](https://github.com/edekadigital/frontbend/blob/master/example/config.json)
