<template>
  <Layout>
    <h1>Index</h1>
    <ProductGrid />
  </Layout>
</template>

<script>
import ProductGrid from '~/components/products/ProductGrid'

export default {
  components: {
    ProductGrid
  },
  metaInfo: {
    title: 'Welcome'
  }
}
</script>
