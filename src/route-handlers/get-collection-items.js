const _ = require("lodash");
const config = require("config");
const winnow = require("winnow");
const responseError = require("../utils/response-error");
const { formatCollection } = require("../utils/format-ogc");

module.exports = function getCollectionItems(req, res) {
  this.model.pull(req, (error, geojson) => {
    if (error) {
      return responseError(req, res, error);
    }

    let {
      query: { bbox, limit, offset, idField }
    } = req;

    offset = offset || 0;
    limit = limit || config.limit;
    idField = idField || "OBJECTID";

    try {
      const queryOptions = {
        toEsri: false,
        geometry: bboxToGeometry(bbox)
      };
      const queryResult = winnow.query(geojson, queryOptions);
      const pagedReuslt = {
        type: "FeatureCollection",
        features: queryResult.features.slice(offset, limit)
      };
      const finalResult = formatCollection(pagedReuslt, {
        baseURL: config["output-ogcapi-features"].baseURL,
        matched: queryResult.features.length,
        offset,
        limit,
        idField
      });

      res.status(200).json(finalResult);
    } catch (error) {
      responseError(req, res, error);
    }
  });
};

function bboxToGeometry(bbox) {
  if (!bbox) {
    return;
  }

  const coordinates = bbox.split(",").map(Number);
  return {
    xmin: coordinates[0],
    ymin: coordinates[1],
    xmax: coordinates[2],
    ymax: coordinates[3],
    spatialReference: {
      wkid: 4326
    }
  };
}
