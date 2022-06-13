<template>
  <article
    class="product"
    :style="`--product-category-color: ${product.category.color.hex}`"
    :id="product.slug.current"
  >
    <div class="product-text" :class="{ hideCategory: hideCategory }">
      <h3 class="product-title">{{ product.title }}</h3>
      <p class="product-lead">{{ product.lead[$context.locale] }}</p>
    </div>
    <div class="product-image">
      <g-image
        v-if="product.mainImage"
        class="product-image"
        :src="
          $urlForImage(product.mainImage, $static.metadata.sanityOptions)
            .height(600)
            .width(600)
            .auto('format')
            .url()
        "
        :alt="product.mainImage.alt[$context.locale]"
      />
    </div>
  </article>
</template>

<static-query>
{
  metadata {
    sanityOptions {
      projectId
      dataset
    }
  }
}
</static-query>

<script>
import BlockContent from "@/components/tools/BlockContent";

export default {
  components: {
    BlockContent,
  },
  props: {
    product: Object,
    hideCategory: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.product {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: var(--color-palegreen);
  border-radius: var(--border-radius);
  position: relative;
  margin-bottom: var(--spacing-sitepadding);
  padding: 0.75rem;
  &:hover {
    background: var(--color-paleyellow);
  }
  &-text {
    grid-column: 2 / span 3;
    padding: 1rem;
    padding-left: 3rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    order: 2;
    font-size: var(--font-size-m);
    position: relative;

    &:before {
      content: " ";
      display: block;
      background: var(--product-category-color);
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 1.2rem;
      position: absolute;
      left: 0.25rem;
      top: 1.25rem;
    }

    &.hideCategory {
      &:before {
        display: none;
      }
      .product-category {
        display: none;
      }
    }
  }
  &-title {
    margin: 0 0 1.25rem;
    font-weight: 400;
    font-size: var(--font-size-l);
  }
  &-category {
    color: var(--color-lightgray);
  }
  &-image {
    grid-column: 1 / span 1;
    border-radius: var(--border-radius);
    position: relative;
    order: 1;

    img {
      display: block;
    }
  }
}

@media (max-width: 1000px) {
  .product {
    grid-template-columns: 1fr;
    &-image,
    &-text {
      grid-column: 1 / -1;
    }
    &-text {
      padding-left: 0;
    }
  }
}
</style>
