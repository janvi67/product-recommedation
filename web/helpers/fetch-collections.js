import { Shopify } from "@shopify/shopify-api";

// GraphQL Query for fetching custom collections
const FETCH_COLLECTIONS_QUERY = `
  query CustomCollectionList {
    collections(first: 50, query: "collection_type:custom") {
      nodes {
        id
        handle
        title
        updatedAt
        descriptionHtml
        sortOrder
        templateSuffix
      }
    }
  }
`;


// Function to format GraphQL response for collections
const formatGqlResponse = (res) => {
  const collections = res?.body?.data?.collections?.nodes || [];

  if (!collections.length) return [];

  return collections.map((collection) => ({
    id: collection.id,
    handle: collection.handle,
    title: collection.title,
    updatedAt: collection.updatedAt,
    descriptionHtml: collection.descriptionHtml,
    published: collection.publishedOnCurrentPublication,
    sortOrder: collection.sortOrder,
    templateSuffix: collection.templateSuffix,
  }));
};

// Function to fetch custom collections
export default async function fetchCollection(session) {
  const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);

  try {
    const res = await client.query({
      data: {
        query: FETCH_COLLECTIONS_QUERY,
      },
    });

    // Format and return the response
    return formatGqlResponse(res);
  } catch (error) {
    if (error instanceof Shopify.Errors.GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      );
    } else {
      throw error;
    }
  }
}
