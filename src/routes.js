module.exports = [
  {
    path: "$namespace/conformance",
    methods: ["get"],
    handler: "getConformance"
  },
  {
    path: "$namespace/$providerParams/collections/:collectionId/items",
    methods: ["get"],
    handler: "getCollectionItems"
  },
  {
    path:
      "$namespace/$providerParams/collections/:collectionId/items/:featureId",
    methods: ["get"],
    handler: "getCollectionItem"
  }
];
