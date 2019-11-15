module.exports = function getConformance(req, res) {
  res.json({
    conformsTo: ["http://www.opengis.net/spec/ogcapi-features-1/1.0/conf/core"]
  });
};
