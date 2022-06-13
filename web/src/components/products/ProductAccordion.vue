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
        :alt="product.mainImage.alt[$context.locale]"
      />
    </div>
    <div class="product-info">
      <ul class="product-info-tabs">
        <li><button class="active">Tab title</button></li>
        <li><button>Tab title</button></li>
        <li><button>Tab title</button></li>
      </ul>
      <div class="product-info-content">
        <p>
          Perlende fermentert te av nordiske ville vekster og urter fra lokale
          bønder, sankere og urbane hager. Opplev tropiske smaker fra norsk
          natur. Ja du leste riktig. Ville vekster kan ha smaker som vanilje,
          mandel og ananas!
        </p>
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
    };
  },
  methods: {
    expandAccordion() {
      this.open = !this.open;
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
  &.open {
    &:after {
      transform: rotate(0deg);
    }
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

    img {
      display: block;
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
  &.open .expand {
    left: auto;
    right: 0;
    width: 5rem;
    height: 5rem;
  }
  &-info {
    order: 3;
    grid-column: 1 / -1;

    display: none;
  }
  &.open &-info {
    display: block;
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
