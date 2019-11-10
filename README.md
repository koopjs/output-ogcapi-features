# @koopjs/output-ogcapi-features

Experimental output plugin for [OGC API - Feature](https://github.com/opengeospatial/ogcapi-features). This output turns the dataset from any provider into a single-collection service.

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

This output translates the dataset from the provider into a single-collection service. So you can access the data with the collection id `0`:

```
GET base-url/collections/0/items
```
