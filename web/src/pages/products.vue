<template>
  <Layout>
    <PageHeader />
    <main class="page-content">
      Content goes here
    </main>
    <ProductGrid />
  </Layout>
</template>

<script>
import PageHeader from "~/components/PageHeader";
import ProductGrid from "~/components/products/ProductGrid";

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
