const config = require("config");
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
      const collection = generateCollection(collectionId, geojson);

      const baseURL = config["output-ogcapi-features"].baseURL;
      const collectionURL = new URL(`${baseURL}/collections?f=json`);

      res.status(200).json({
        collections: [collection],
        links: [
          {
            href: collectionURL.href,
            rel: "self",
            type: "application/geo+json",
            title: "this document"
          }
        ]
      });
    } catch (error) {
      responseError(req, res, error);
    }
  });
};
