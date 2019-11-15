function generateItemLinks(baseUrl, collectionId, featureId) {
  const links = [
    {
      href: `${baseUrl}/collections/${collectionId}/items/${featureId}?f=json`,
      rel: "self",
      type: "application/geo+json",
      title: "this document"
    },
    {
      href: `${baseUrl}/collections/${collectionId}/items?f=json`,
      rel: "collection",
      type: "application/geo+json",
      title: "the collection document"
    }
  ];

  return links;
  jsonjsonjsonjson;
}

function generateCollectionItemsLinks(baseUrl, collectionId, options) {
  const collectionUrl = new URL(
    `${baseUrl}/collections/${collectionId}/items?f=json`
  );

  const links = [
    {
      href: collectionUrl.href,
      rel: "self",
      type: "application/geo+json",
      title: "this document"
    }
  ];

  if (options.offset > 0) {
    collectionUrl.searchParams.set("limit", options.limit);
    collectionUrl.searchParams.set(
      "offset",
      Math.max(0, options.offset - options.limit)
    );

    links.push({
      href: collectionUrl.href,
      rel: "prev",
      type: "application/geo+json",
      title: "prev page"
    });
  }

  if (options.matched > options.limit + options.offset) {
    collectionUrl.searchParams.set("limit", options.limit);
    collectionUrl.searchParams.set(
      "offset",
      Math.max(options.matched, options.limit + options.offset)
    );

    links.push({
      href: collectionUrl.href,
      rel: "next",
      type: "application/geo+json",
      title: "next page"
    });
  }

  return links;
}

function generateCollectionLinks(baseUrl, collectionId) {
  const links = [
    {
      href: `${baseUrl}/collections/${collectionId}?f=json`,
      rel: "self",
      type: "application/geo+json",
      title: "this document"
    }
  ];

  return links;
}

module.exports = {
  generateCollectionLinks,
  generateCollectionItemsLinks,
  generateItemLinks
};
