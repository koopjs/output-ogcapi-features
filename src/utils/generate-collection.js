const _ = require("lodash");
const config = require("config");
const bbox = require("@turf/bbox");
const { generateCollectionLinks } = require("./generate-links");

function generateCollection(collectionId, geojson) {
  const metadata = geojson.metadata || {};
  const extent = getExtent(geojson);
  const links = generateCollectionLinks(
    config["output-ogcapi-features"].baseURL,
    collectionId
  );
  const result = {
    // id and name are the same for compatibility
    id: collectionId,
    name: collectionId,
    description: metadata.description,
    title: metadata.name || collectionId,
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

module.exports = generateCollection;
