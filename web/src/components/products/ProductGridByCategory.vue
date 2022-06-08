<template>
  <div class="products">
    <section
      v-for="(category, index) in $static.productCategories.edges"
      :key="index"
      class="product-grid-sorted"
    >
      <div
        class="product-grid-sorted__text"
        :style="`--category-color: ${category.node.color.hex}`"
      >
        <h2 class="category-title">
          {{ category.node.title[$context.locale] }}
        </h2>
        <p class="category-description" v-if="category.node.description">
          {{ category.node.description[$context.locale] }}
        </p>
      </div>
      <ProductAccordion
        v-for="product in getProductsByCategory(category)"
        :key="product.id"
        :product="product.node"
        hideCategory
      />
    </section>
  </div>
</template>

<static-query>
query {
  productCategories: allSanityProductCategory(
    sortBy: "title", order: ASC
  ) {
    edges {
      node {
        id
        title {
          no
          en
        }
        description {
          no
          en
        }
        color {
          hex
        }
      }
    }
  }
  products: allSanityProduct(
    filter: {slug: {current: {ne: null}}},
    sortBy: "title", order: ASC
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
import ProductAccordion from "@/components/products/ProductAccordion";

export default {
  components: {
    ProductAccordion,
  },
  methods: {
    getProductsByCategory(category) {
      return this.$static.products.edges.filter(
        (item) => item.node.category.title.en === category.node.title.en
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.product-grid-sorted {
  border-top: 1px solid var(--color-text);
  border-radius: 0;
  padding: var(--spacing-sitepadding) 0;
  &__text {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-column: 1 / -1;
    line-height: 1.2;
    padding-bottom: calc(var(--spacing-sitepadding) * 2);
    h2 {
      grid-column: 1 / span 4;
      font-weight: 400;
      font-size: var(--font-size-l);
      position: relative;
      padding-left: 1.4em;
      margin: 0;
      &:before {
        content: " ";
        display: block;
        background: var(--category-color);
        width: 1em;
        height: 1em;
        border-radius: 1.2em;
        position: absolute;
        left: 0;
        top: 0.05em;
      }
    }
    p {
      grid-column: 5 / span 6;
    }
  }
}
/*@media (min-width: 1800px) {
  .product-grid-sorted {
    grid-template-columns: repeat(4, 1fr);
  }
}*/
@media (max-width: 1000px) {
  .product-grid-sorted {
    &__text {
      display: block;
      h2 {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
