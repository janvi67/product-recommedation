import {
  EmptyState,
  Layout,
  Spinner,
  Card,
  Page,
  ResourceList,
  ResourceItem,
  TextContainer,
  Thumbnail,
  Button,
} from "@shopify/polaris";
import { useAppQuery } from "../hooks";
import "@shopify/polaris/build/esm/styles.css";
import { useNavigate } from "react-router-dom";

function Recommendations() {
  const { data, isLoading, isRefetching } = useAppQuery({
    url: "api/products",
  });
  const Navigate = useNavigate();

  if (isLoading || isRefetching) {
    return (
      <Page title="Product Recommendations" fullWidth>
        <Layout>
          <Layout.Section>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Spinner size="large" />
            </div>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  return (
    <Page title="Product Recommendations" fullWidth>
      <Layout>
        {data?.products?.length > 0 ? (
          <Layout.Section>
            <ResourceList
              resourceName={{ singular: "product", plural: "products" }}
              items={data.products}
              renderItem={(product) => {
                const { id, title, image, description, variants } = product;
                const price = variants?.[0]?.price || "Price not available";

                return (
                  <ResourceItem id={id} media={<Thumbnail source={image} />}>
                    <Card>
                      <TextContainer>
                        <div style={{ marginTop: "var(--p-space-2)" }}>
                          <p>Title: {title}</p>
                        </div>
                        <div style={{ marginTop: "var(--p-space-2)" }}>
                          <p>Description: {description}</p>
                        </div>
                        <div style={{ marginTop: "var(--p-space-2)" }}>
                          <p>Price: {price}</p>
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
        )}
      </Layout>
    </Page>
  );
}

export default Recommendations;
