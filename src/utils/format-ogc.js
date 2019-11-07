const {
  generateItemLinks,
  generateCollectionLinks
} = require("./generate-links");

function formatCollection(featureCollection, options = {}) {
  const result = {
    type: "FeatureCollection",
    features: featureCollection.features.map(feature =>
      formatItem(feature, options)
    ),
    numberReturned: featureCollection.features.length,
    numberMatched: options.matched,
    timeStamp: new Date().toISOString(),
    links: generateCollectionLinks(options.baseURL, options)
  };

  return result;
}

function formatItem(feature, options) {
  const featureId =
    options.featureId || findId(feature.properties, options.idField);
  const result = {
    type: "Feature",
    id: featureId,
    geometry: feature.geometry,
    properties: feature.properties,
    links: generateItemLinks(options.baseURL, featureId, options)
  };

  return result;
}

function findId(properties, idField = "objectid") {
  const idKey = Object.keys(properties).find(
    key => key.toLocaleLowerCase() === idField.toLocaleLowerCase()
  );
  return properties[idKey];
}

module.exports = {
  formatItem,
  formatCollection
};
