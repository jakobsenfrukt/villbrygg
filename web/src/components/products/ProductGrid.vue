<template>
  <section class="product-grid">
    <ProductItem
      v-for="product in $static.products.edges.slice(0, limit)"
      :key="product.id"
      :product="product.node"
    />
  </section>
</template>

<static-query>
query {
  products: allSanityProduct(sortBy: "title") {
    edges {
      node {
        id
        title
        slug {
          current
        }
        lead {
          no
          en
        }
        mainImage {
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
}
</static-query>

<script>
import ProductItem from '@/components/products/ProductItem'

export default {
  components: {
    ProductItem
  },
  props: {
    limit: {
      type: Number,
      default: 12
    }
  }
}
</script>

<style lang="scss" scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 4rem;
  padding: 4rem;
}
/*@media (min-width: 1800px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}*/
@media (max-width: 1200px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 640px) {
  .product-grid {
    grid-template-columns: repeat(1, 1fr);
    padding: 2rem;
  }
}
</style>