module.exports = function getConformance(req, res) {
  res.json({
    conformsTo: [
      "http://www.opengis.net/spec/wfs-1/3.0/req/core",
      "http://www.opengis.net/spec/wfs-1/3.0/req/geojson"
    ]
  });
};
