const {
  getConformance,
  getCollection,
  getCollections,
  getCollectionItem,
  getCollectionItems
} = require("./request-handlers");
const routes = require("./routes");
const packageInfo = require("../package");

function OGCAPIFeatures() {}

OGCAPIFeatures.version = packageInfo.version;

OGCAPIFeatures.name = "ogcapi-features";

OGCAPIFeatures.type = "output";

OGCAPIFeatures.prototype.getConformance = getConformance;

OGCAPIFeatures.prototype.getCollection = getCollection;

OGCAPIFeatures.prototype.getCollections = getCollections;

OGCAPIFeatures.prototype.getCollectionItem = getCollectionItem;

OGCAPIFeatures.prototype.getCollectionItems = getCollectionItems;

OGCAPIFeatures.routes = routes;

module.exports = OGCAPIFeatures;
