<template>
  <Layout>
    <PageHeader :content="$page.productpage.pageHeader" />
    <main class="page-content">
      <ProductGrid />
    </main>
  </Layout>
</template>

<page-query>
query {
  productpage: sanityProductpage (id: "productpage") {
    pageHeader {
      heading {
        no
        en
      }
      subheading {
        no
        en
      }
      text {
        no
        en
      }
      images {
        asset {
          _id
          url
        }
        alt {
          no
          en
        }
        hotspot {
          x
          y
          height
          width
        }
        crop {
          top
          bottom
          left
          right
        }
      }
    }
  }
}
</page-query>

<script>
import PageHeader from "~/components/PageHeader";
import ProductGrid from "~/components/products/ProductGridByCategory";

export default {
  components: {
    PageHeader,
    ProductGrid,
  },
  metaInfo: {
    title: "Products",
  },
};
</script>
