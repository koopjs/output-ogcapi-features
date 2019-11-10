function generateItemLinks(baseURL, featureId) {
  const links = [
    {
      href: `${baseURL}/collections/0/items/${featureId}.json`,
      rel: "self",
      type: "application/geo+json",
      title: "this document"
    },
    {
      href: `${baseURL}/collections/0/items.json`,
      rel: "collection",
      type: "application/geo+json",
      title: "the collection document"
    }
  ];

  return links;
}

function generateCollectionItemsLinks(baseURL, options) {
  const collectionURL = new URL(`${baseURL}/collections/0/items.json`);

  const links = [
    {
      href: collectionURL.href,
      rel: "self",
      type: "application/geo+json",
      title: "this document"
    }
  ];

  if (options.offset > 0) {
    collectionURL.searchParams.set("limit", options.limit);
    collectionURL.searchParams.set(
      "offset",
      Math.max(0, options.offset - options.limit)
    );

    links.push({
      href: collectionURL.href,
      rel: "prev",
      type: "application/geo+json",
      title: "prev page"
    });
  }

  if (options.matched > options.limit + options.offset) {
    collectionURL.searchParams.set("limit", options.limit);
    collectionURL.searchParams.set(
      "offset",
      Math.max(options.matched, options.limit + options.offset)
    );

    links.push({
      href: collectionURL.href,
      rel: "next",
      type: "application/geo+json",
      title: "next page"
    });
  }

  return links;
}

function generateCollectionLinks(baseURL, collectionId) {
  const collectionURL = new URL(
    `${baseURL}/collections/${collectionId}/items.json`
  );

  const links = [
    {
      href: collectionURL.href,
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
