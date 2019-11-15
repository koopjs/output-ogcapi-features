# @koopjs/output-ogcapi-features

[![npm](https://img.shields.io/npm/v/@koopjs/output-ogcapi-features)](https://www.npmjs.com/package/@koopjs/output-ogcapi-features) [![Build Status](https://www.travis-ci.org/koopjs/output-ogcapi-features.svg?branch=master)](https://www.travis-ci.org/koopjs/output-ogcapi-features)

Experimental output plugin for [OGC API - Feature](https://github.com/opengeospatial/ogcapi-features) (AKA WFS 3.0). This output turns the dataset from any provider into a single-collection service.

Implemented specs:

- http://www.opengis.net/spec/wfs-1/3.0/req/core

Implemented routes:

- [x] `/conformance`
- [x] `/collections`
- [x] `/collections/:collectionId`
- [x] `/collections/:collectionId/items`
- [x] `/collections/:collectionId/items/:featureId`

## Installation

```
npm install @koopjs/output-ogcapi-features
```

## Usage

This provider can be registered in a Koop app.

```javascript
const Koop = require("koop");
const ogcOutput = require("@koopjs/output-ogcapi-features");

Koop.register(ogcOutput);
```

If the app is developed using the Koop CLI, it can be auto-registered with

```bash
koop add @koopjs/provider-ogcapi-features
```
