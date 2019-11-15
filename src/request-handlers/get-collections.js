const responseError = require("../utils/response-error");
const { formatCollection } = require("../utils/format-ogc");
const getBaseUrl = require("../utils/get-base-url");

module.exports = function getCollectionItem(req, res) {
  this.model.pull(req, (error, geojson) => {
    if (error) {
      return responseError(req, res, error);
    }

    try {
      const baseUrl = getBaseUrl(req);
      const collection = formatCollection(geojson, {
        collectionId: "0",
        baseUrl
      });

      res.status(200).json({
        collections: [collection],
        links: [
          {
            href: `${baseUrl}/collections?f=json`,
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
