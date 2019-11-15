const winnow = require("winnow");
const responseError = require("../utils/response-error");
const { formatCollectionItem } = require("../utils/format-ogc");
const getBaseUrl = require("../utils/get-base-url");

module.exports = function getCollectionItem(req, res) {
  this.model.pull(req, (error, geojson) => {
    if (error) {
      return responseError(req, res, error);
    }

    const {
      params: { collectionId, featureId },
      query: { idField }
    } = req;

    try {
      const queryOptions = {
        toEsri: false,
        where: generateIdFilter(idField || "OBJECTID", featureId)
      };
      const queryResult = winnow.query(geojson, queryOptions);

      if (queryResult.features.length !== 1) {
        const error = new Error("The requested feature was not found.");
        error.code = 404;
        return responseError(req, res, error);
      }

      const finalResult = formatCollectionItem(queryResult.features[0], {
        baseUrl: getBaseUrl(req),
        collectionId,
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
