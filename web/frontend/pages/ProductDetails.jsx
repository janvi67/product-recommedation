import React from "react";
import { useLocation } from "react-router-dom";
import {
  Page,
  Layout,
  Card,
  Image,
  Text,
  DataTable,
  Button,
  EmptyState,
  ResourceList,
  ResourceItem,
  Thumbnail,
  BlockStack,
  TextContainer,

} from "@shopify/polaris";
import { useAppQuery } from "../hooks";

function ProductDetails() {
  const location = useLocation();
  const { product } = location.state || {};

  const { data: productData } = useAppQuery({
    url: "api/products",
  });

  // Fetch collections
  const { data: collectionData } = useAppQuery({
    url: "api/collections",
  });

  console.log("Product data:", productData);
  console.log("Collection data:", collectionData);
 

  if (!product) {
    return (
      <Page title="Product Details" fullWidth>
        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack>
                <p>No product details available. Please select a product.</p>
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  const { title, image } = product;

  
  
  
  // Dynamically add collections from API to rows
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const formatCollectionId = (id) => {
    // Extract only the first 4 digits of the collection ID
    return id.slice(25,); // For example, "616746189169" becomes "6167"
  };
  // Example usage in rows
  const dynamicRows =
    collectionData?.collections?.map((collection, index) => [
      `${collection.sortOrder} - ${collection.title || `Collection ${index + 1}`}`,
      formatDate(new Date()), // Use the current date or a specific date
    formatCollectionId(collection.id || `000${index + 8}`)  ,
      `Sort Order: ${collection.sortOrder || "N/A"}`,
    ]) || [];
  
  
  // Combine static rows and dynamic rows
  const rows = [ ...dynamicRows];
  // Custom headings for the table
  const headings = [
    <Text size="small" element="h2">
      Name
    </Text>,
    <Text size="small" element="h2">
      Created date
    </Text>,
    <Text size="small" element="h2">
      ID
    </Text>,
    <Text size="small" element="h2">
      Actions
    </Text>,
  ];

  return (
    <Page title={title} fullWidth>
      <Layout>
        <Layout.Section>
          <Card title="Product Information">
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <Image src={image} width="400" height="400" alt={title} />
              <BlockStack>
                <Text variant="heading3xl" as="h1">
                  {title}
                </Text>
              </BlockStack>
            </div>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Button variant="primary">Create new recommendation</Button>
        </Layout.Section>
        <Layout.Section>
          <Page title="Active Recommendations">
            <Card>
             
              <DataTable
                columnContentTypes={["text", "text", "text", "text"]}
                headings={headings} // Use DisplayText component for headings
                rows={rows}
              />
            </Card>
          </Page>
                  {/* {collectionData?.collections?.length > 0 ? (
                    <Layout.Section>
                      <ResourceList
                        resourceName={{ singular: "collection", plural: "collections" }}
                        items={collectionData.collections}
                        renderItem={(collection) => {
                          const { id, sortOrder } = collection;
                          
                          return (
                            <ResourceItem id={id} media={<Thumbnail source={image} />}>
                              <Card>
                                <TextContainer>
                                  <div style={{ marginTop: "var(--p-space-2)" }}>
                                    <p>recommedation: {sortOrder}</p>
                                  </div>
                                 
                                  <Button
                                    onClick={() =>
                                      Navigate("/ProductDetails", { state: { product } })
                                    }
                                  >
                                    View Details
                                  </Button>
                                </TextContainer>
                              </Card>
                            </ResourceItem>
                          );
                        }}
                      />
                    </Layout.Section>
                  ) : (
                    <Layout.Section>
                      <Card>
                        <EmptyState
                          heading="No Products Found"
                          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                        >
                          <p>Add products using the card above</p>
                        </EmptyState>
                      </Card>
                    </Layout.Section>
                  )} */}

        
        </Layout.Section>

        {/* Product List Section */}
      </Layout>
    </Page>
  );
}

export default ProductDetails;

// import React from "react";
// import { Page, Card, DataTable, Text,Button } from "@shopify/polaris";

// function ActiveRecommendations() {
//   const rows = [
//     ["Best sellers - Product", "December 17, 2024", "0001", "Reposition"],
//     ["New arrivals - Shop", "December 17, 2024", "0002", "Reposition"],
//     ["Recently viewed - Shop", "December 17, 2024", "0003", "Reposition"],
//     ["Best sellers - Collection", "December 17, 2024", "0004", "Reposition"],
//     ["Recently viewed - Collection", "December 17, 2024", "0005", "Reposition"],
//     ["Products related to this item - Cart", "December 17, 2024", "0006", "Reposition"],
//     ["Products related to this item - Product", "December 17, 2024", "0007", "Reposition"],
//   ];

//   // Custom headings for the table
//   const headings = [
//     <Text size="small" element="h2">Name</Text>,
//     <Text size="small" element="h2">Created date</Text>,
//     <Text size="small" element="h2">ID</Text>,
//     <Text size="small" element="h2">Actions</Text>,
//   ];

//   return (
//     <Page title="Active Recommendations">
//       <Card>
//       <Button variant="primary">Save theme</Button>
//         <DataTable
//           columnContentTypes={["text", "text", "text", "text"]}
//           headings={headings} // Use DisplayText component for headings
//           rows={rows}
//         />
//       </Card>
//     </Page>
//   );
// }

// export default ActiveRecommendations;
