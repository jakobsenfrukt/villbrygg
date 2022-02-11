<template>
  <Layout class="index">
    <PageHeader text="Fermented drinks to help you feel your best" />
    <ProductGrid />
    <ArticleGrid />
  </Layout>
</template>

<script>
import PageHeader from "~/components/PageHeader";
import ProductGrid from "~/components/products/ProductGrid";
import ArticleGrid from "~/components/articles/ArticleGrid";

export default {
  components: {
    PageHeader,
    ProductGrid,
    ArticleGrid,
  },
  metaInfo: {
    title: "Welcome",
  },
};
</script>
