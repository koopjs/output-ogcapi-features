const url = require("url");

function getBaseUrl(req) {
  return url.format({
    protocol: req.protocol,
    host: req.get("host"),
    pathname: req.originalUrl.split("/collections")[0]
  });
}

module.exports = getBaseUrl;
