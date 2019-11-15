const responseError = require("../utils/response-error");
const { formatCollection } = require("../utils/format-ogc");
const getBaseUrl = require("../utils/get-base-url");

module.exports = function getCollectionItem(req, res) {
  this.model.pull(req, (error, geojson) => {
    if (error) {
      return responseError(req, res, error);
    }

    const {
      params: { collectionId }
    } = req;

    try {
      const result = formatCollection(geojson, {
        baseUrl: getBaseUrl(req),
        collectionId
      });
      res.status(200).json(result);
    } catch (error) {
      responseError(req, res, error);
    }
  });
};
