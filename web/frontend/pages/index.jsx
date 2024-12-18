// import {
//   Card,
//   Page,
//   Layout,
//   TextContainer,
//   Image,
//   Stack,
//   Link,
//   Heading,
// } from "@shopify/polaris";
// import { TitleBar } from "@shopify/app-bridge-react";

// import { ProductCard, ProductsCard } from "../components";
// import { useAppQuery } from "../hooks";
// import { ProductList } from "../components/ProductList";

// export default function HomePage() {
//   const { data, isLoading, refetch, isRefetching } = useAppQuery({
//     url: "/api/products",
//   });

//   console.log("data: ", data);

//   return (
//     <Page title="Dashboard">
//       <Layout>
//         <Layout.Section>
//           <ProductsCard />
//         </Layout.Section>
//         <Layout.Section>
//           <ProductList
//             data={data}
//             isLoading={isLoading}
//             isRefetching={isRefetching}
//           />
//         </Layout.Section>
//       </Layout>
//     </Page>
//   );
// }

import {
  Card,
  Page,
  Layout,
  TextContainer,
  Button,
Text,
} from "@shopify/polaris";
import { useNavigate } from "@shopify/app-bridge-react";


export default function HomePage() {
  const Navigate=useNavigate();
 
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <TextContainer>
              <Text variant="heading3xl" as="h2">
                Welcome to the Product Recommendation App
              </Text>
              <p>
                This app helps you explore personalized product recommendations
                to enhance your shopping experience. Navigate through the app to
                find products tailored to your preferences.
              </p>
              <Button primary onClick={() => Navigate("/Recommendation")}>
                View Products
              </Button>
            </TextContainer>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>



  );
}
