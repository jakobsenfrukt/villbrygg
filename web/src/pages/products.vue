<template>
  <Layout>
    <PageHeader />
    <ProductGrid />
  </Layout>
</template>

<script>
import PageHeader from '~/components/PageHeader'
import ProductGrid from '~/components/products/ProductGrid'

export default {
  components: {
    PageHeader,
    ProductGrid
  },
  metaInfo: {
    title: 'Products'
  }
}
</script>