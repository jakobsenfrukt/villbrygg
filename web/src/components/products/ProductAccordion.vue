<template>
  <article
    class="product"
    :class="{ open: open }"
    :style="`--product-category-color: ${product.category.color.hex}`"
    :id="product.slug.current"
  >
    <div class="product-text" :class="{ hideCategory: hideCategory }">
      <h3 class="product-title">{{ product.title }}</h3>
      <p class="product-lead">{{ product.lead[$context.locale] }}</p>
    </div>
    <button class="expand" @click="expandAccordion()">
      {{ $t("navigation.readmore") }}
    </button>
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
        :alt="
          product.mainImage.alt[$context.locale]
            ? product.mainImage.alt[$context.locale]
            : ''
        "
      />
    </div>
    <div class="product-info">
      <div class="product-info-images">
        <g-image
          v-if="product.mainImage"
          :src="
            $urlForImage(product.mainImage, $static.metadata.sanityOptions)
              .height(800)
              .width(800)
              .auto('format')
              .url()
          "
          :alt="
            product.mainImage.alt[$context.locale]
              ? product.mainImage.alt[$context.locale]
              : ''
          "
        />
        <g-image
          v-if="product.detailImage"
          :src="
            $urlForImage(product.detailImage, $static.metadata.sanityOptions)
              .width(800)
              .auto('format')
              .url()
          "
          :alt="
            product.detailImage.alt[$context.locale]
              ? product.detailImage.alt[$context.locale]
              : ''
          "
        />
      </div>
      <ul class="product-info-tabs">
        <li v-for="(block, index) in product.info" :key="index">
          <button
            :class="index === activeBlock ? 'active' : ''"
            @click="setActiveBlock(index)"
          >
            {{ block.title[$context.locale] }}
          </button>
        </li>
      </ul>
      <div class="product-info-content">
        <template v-if="$context.locale == 'no'">
          <block-content
            :blocks="product.info[activeBlock].body._rawNo"
            v-if="product.info[activeBlock].body._rawNo"
            class="block-content body"
          />
        </template>
        <template v-else-if="$context.locale == 'en'">
          <block-content
            :blocks="product.info[activeBlock].body._rawEn"
            v-if="product.info[activeBlock].body._rawEn"
            class="block-content body"
          />
        </template>
      </div>
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
  data() {
    return {
      open: false,
      activeBlock: 0,
    };
  },
  methods: {
    expandAccordion() {
      this.open = !this.open;
    },
    setActiveBlock(block) {
      this.activeBlock = block;
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
  &:hover,
  &.open {
    background: var(--color-paleyellow);
  }
  &:after {
    content: "";
    display: block;
    width: 1rem;
    height: 1rem;
    background-image: url("/assets/graphics/icons/menu-icon__close.svg");
    background-size: 100%;
    position: absolute;
    top: var(--spacing-sitepadding);
    right: var(--spacing-sitepadding);
    transform: rotate(45deg);
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

    height: 100%;

    img {
      display: block;
      object-fit: cover;
    }
  }
  .expand {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: none;
    z-index: 1000;
  }
  &-info {
    order: 3;
    grid-column: 1 / -1;

    display: none;
  }
  &-info-images {
    display: grid;
    grid-template-columns: repeat(20, 1fr);
    gap: 0.75rem;
    img {
      border-radius: var(--border-radius);
    }
    img:first-of-type {
      grid-column: 1 / span 9;
    }
    img:nth-of-type(2) {
      grid-column: 10 / span 11;
    }
  }
  &-info-tabs {
    list-style: none;
    margin: var(--spacing-sitepadding) 0 calc(var(--spacing-sitepadding) * 2);
    padding: 0;
    display: flex;
    button {
      border: 1px solid var(--color-lightgray);
      background: transparent;
      color: var(--color-text);
      border-radius: var(--border-radius-l);
      font-size: var(--font-size-s);
      padding: 0.5rem 1rem;
      margin: 0 0.4rem 0.6rem 0;
      cursor: none;
      &.active {
        background: var(--product-category-color);
        border-color: var(--product-category-color);
        cursor: none;
      }
      &:hover {
        background: var(--product-category-color);
        border-color: var(--product-category-color);
      }
    }
  }
  &-info-content {
    font-size: var(--font-size-m);
  }
  &.open {
    &:after {
      transform: rotate(0deg);
    }
    .product-image {
      display: none;
    }
    .product-text {
      grid-column: 1 / -1;
      padding-left: 0;
    }
    .expand {
      left: auto;
      right: 0;
      width: 5rem;
      height: 5rem;
    }
    .product-info {
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
