<template>
  <article
    class="product"
    :style="`--product-category-color: ${product.category.color.hex}`"
  >
    <div class="product-text" :class="{ hideCategory: hideCategory }">
      <h3 class="product-title">{{ product.title }}</h3>
      <span class="product-category">
        {{ product.category.title[$context.locale] }}
      </span>
    </div>
    <div class="product-image">
      <g-image
        v-if="product.mainImage"
        class="product-image"
        :src="
          $urlForImage(product.mainImage, $static.metadata.sanityOptions)
            .height(600)
            .width(420)
            .auto('format')
            .url()
        "
        :alt="
          product.mainImage.alt[$context.locale]
            ? product.mainImage.alt[$context.locale]
            : ''
        "
      />
      <g-link
        class="product-link"
        :to="`${$tp($t('slug.products'))}#${product.slug.current}`"
      >
        <div class="product-overlay">
          <span class="product-link__intro" v-if="product.intro">{{
            product.intro[$context.locale]
          }}</span>
          <span class="product-link__readmore"
            >{{ $t("navigation.readmore") }} &rarr;</span
          >
        </div>
      </g-link>
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
  display: flex;
  flex-direction: column;
  position: relative;
  &-text {
    padding: 1rem 0 1rem;
    padding-left: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
      padding-left: 0;
      &:before {
        display: none;
      }
      .product-category {
        display: none;
      }
    }
  }
  &-title {
    margin: 0;
    font-weight: 400;
  }
  &-category {
    color: var(--color-lightgray);
  }
  &-image {
    border-radius: var(--border-radius);
    position: relative;
    order: 1;

    img {
      display: block;
    }
  }
  &-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &-link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--product-category-color);
    border-radius: var(--border-radius);
    color: inherit;
    transition: opacity 0.2s ease;
    opacity: 0;
    cursor: none;

    &:hover {
      opacity: 1;
    }

    &__intro {
      font-size: var(--font-size-m);
      line-height: 1;
    }
    &__readmore {
      margin: auto 0 0 0;
    }
  }
}
</style>
