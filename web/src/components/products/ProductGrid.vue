<template>
  <section class="product-grid">
    <h2 class="product-grid__title">
      Experience <strong>amazing flavours with a good conscience</strong>
    </h2>
    <ProductItem
      v-for="product in $static.products.edges.slice(0, limit)"
      :key="product.id"
      :product="product.node"
    />

    <ProductItem
      v-for="product in $static.products.edges.slice(0, limit)"
      :key="product.id"
      :product="product.node"
    />
    <ProductItem
      v-for="product in $static.products.edges.slice(0, limit)"
      :key="product.id"
      :product="product.node"
    />
    <ProductItem
      v-for="product in $static.products.edges.slice(0, limit)"
      :key="product.id"
      :product="product.node"
    />
  </section>
</template>

<static-query>
query {
  products: allSanityProduct(
    filter: {slug: {current: {ne: null}}},
    sortBy: "title", order: DESC
  ) {
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
        category {
          title {
            no
            en
          }
          color {
            hex
          }
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
import ProductItem from "@/components/products/ProductItem";

export default {
  components: {
    ProductItem,
  },
  props: {
    limit: {
      type: Number,
      default: 12,
    },
  },
};
</script>

<style lang="scss" scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: var(--spacing-sitepadding);
  padding: var(--spacing-sitepadding) var(--spacing-sitepadding)
    calc(var(--spacing-sitepadding) * 2);
  background: var(--color-palegreen);
  border-radius: var(--border-radius-l);
  &__title {
    grid-column: 1 / -1;
    max-width: 14em;
    font-size: var(--font-size-l);
    line-height: 1.2;
    font-weight: 400;
    color: var(--color-lightgray);
    strong {
      font-weight: 400;
      color: var(--color-black);
    }
  }
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
  }
}
</style>
