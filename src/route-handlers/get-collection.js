const responseError = require("../utils/response-error");
const generateCollection = require("../utils/generate-collection");

module.exports = function getCollectionItem(req, res) {
  this.model.pull(req, (error, geojson) => {
    if (error) {
      return responseError(req, res, error);
    }

    const {
      params: { collectionId }
    } = req;

    try {
      const result = generateCollection(collectionId, geojson);
      res.status(200).json(result);
    } catch (error) {
      responseError(req, res, error);
    }
  });
};
