<template>
  <Layout>
    <h1>Index</h1>
    <ProductGrid />
    <ArticleGrid />
  </Layout>
</template>

<script>
import ProductGrid from '~/components/products/ProductGrid'
import ArticleGrid from '~/components/articles/ArticleGrid'

export default {
  components: {
    ProductGrid,
    ArticleGrid
  },
  metaInfo: {
    title: 'Welcome'
  }
}
</script>
