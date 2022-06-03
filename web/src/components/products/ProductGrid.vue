<template>
  <section class="product-grid">
    <h2 v-if="heading" class="product-grid__title">
      <block-content
        :blocks="heading._rawNo"
        v-if="heading._rawNo && $context.locale == 'no'"
        class="block-content body"
      />
      <block-content
        :blocks="heading._rawEn"
        v-else-if="heading._rawEn && $context.locale == 'en'"
        class="block-content body"
      />
    </h2>
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
import BlockContent from "@/components/tools/BlockContent";

export default {
  components: {
    ProductItem,
    BlockContent,
  },
  props: {
    limit: {
      type: Number,
      default: 12,
    },
    heading: Object,
  },
};
</script>

<style lang="scss">
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0.75rem;
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
    p {
      margin-bottom: 0;
    }
  }
}
/*@media (min-width: 1800px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}*/
@media (max-width: 1000px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
