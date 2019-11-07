const _ = require("lodash");
const config = require("config");
const winnow = require("winnow");
const responseError = require("../utils/response-error");
const { formatItem } = require("../utils/format-ogc");

module.exports = function getCollectionItem(req, res) {
  this.model.pull(req, (error, geojson) => {
    if (error) {
      return responseError(req, res, error);
    }

    let {
      params: { featureId },
      query: { idField }
    } = req;

    idField = idField || "OBJECTID";

    try {
      const queryOptions = {
        toEsri: false,
        where: generateIdFilter(idField, featureId)
      };
      const queryResult = winnow.query(geojson, queryOptions);

      if (queryResult.features.length !== 1) {
        const error = new Error("The requested feature was not found.");
        error.code = 404;
        return responseError(req, res, error);
      }

      const finalResult = formatItem(queryResult.features[0], {
        baseURL: config["output-ogcapi-features"].baseURL,
        featureId
      });

      res.status(200).json(finalResult);
    } catch (error) {
      responseError(req, res, error);
    }
  });
};

function generateIdFilter(idField, featureId) {
  const filter = `${idField} = `;

  if (Number.isInteger(parseInt(featureId))) {
    return filter + featureId;
  } else {
    return filter + `'${featureId}'`;
  }
}
