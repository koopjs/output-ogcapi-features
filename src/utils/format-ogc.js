const bbox = require("@turf/bbox");
const _ = require("lodash");
const {
  generateItemLinks,
  generateCollectionLinks,
  generateCollectionItemsLinks
} = require("./generate-links");

function formatCollectionItems(featureCollection, options = {}) {
  const result = {
    type: "FeatureCollection",
    features: featureCollection.features.map(feature =>
      formatCollectionItem(feature, options)
    ),
    numberReturned: featureCollection.features.length,
    numberMatched: options.matched,
    timeStamp: new Date().toISOString(),
    links: generateCollectionItemsLinks(
      options.baseUrl,
      options.collectionId,
      options
    )
  };

  return result;
}

function formatCollectionItem(feature, options) {
  const featureId =
    options.featureId || findId(feature.properties, options.idField);
  const result = {
    type: "Feature",
    id: featureId,
    geometry: feature.geometry,
    properties: feature.properties,
    links: generateItemLinks(
      options.baseUrl,
      options.collectionId,
      featureId,
      options
    )
  };

  return result;
}

function formatCollection(geojson, options) {
  const metadata = geojson.metadata || {};
  const extent = getExtent(geojson);
  const links = generateCollectionLinks(options.baseUrl, options.collectionId);
  const result = {
    id: options.collectionId,
    // some clients rely on the "name" field
    name: options.collectionId,
    description: metadata.description,
    title: metadata.name || options.collectionId,
    extent,
    links
  };

  return result;
}

function getExtent(geojson) {
  if (_.has(geojson, "metadata.extent")) {
    const extent = geojson.metadata.extent;
    return [extent.xmin, extent.ymin, extent.xmax, extent.ymax];
  }

  return bbox.default(geojson);
}

function findId(properties, idField = "objectid") {
  const idKey = Object.keys(properties).find(
    key => key.toLocaleLowerCase() === idField.toLocaleLowerCase()
  );
  return properties[idKey];
}

module.exports = {
  formatCollection,
  formatCollectionItem,
  formatCollectionItems
};
