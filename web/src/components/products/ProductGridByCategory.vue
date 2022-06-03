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
      <ProductItem
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
    sortBy: "title", order: DESC
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 0.75rem;
  border-top: 1px solid var(--color-text);
  border-radius: 0;
  padding: calc(var(--spacing-sitepadding) * 0.5) 0 var(--spacing-sitepadding);
  &__text {
    grid-column: 1 / -1;
    line-height: 1.2;
    h2 {
      font-weight: 400;
      position: relative;
      padding-left: 2rem;
      &:before {
        content: " ";
        display: block;
        background: var(--category-color);
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 1.2rem;
        position: absolute;
        left: 0.25rem;
        top: 0.25rem;
      }
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
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
