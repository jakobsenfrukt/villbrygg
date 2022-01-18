<template>
  <article class="product">
    <div class="product-image">
      <g-image
        v-if="product.mainImage"
        class="product-image"
        :src="
          $urlForImage(product.mainImage, $static.metadata.sanityOptions)
            .height(600)
            .width(400)
            .auto('format')
            .url()
        "
        :alt="product.mainImage.alt"
      />
    </div>
    <div class="product-text">
      <ul class="categories">
        <li class="category">Category</li>
      </ul>
      <h3 class="product-title">{{ product.title }}</h3>
      <div class="product-lead" v-if="product._rawLead">
        <block-content :blocks="product._rawLead" />
      </div>
    </div>
    <g-link class="product-link" :to="$tp(`/products/${product.slug.current}`)"
      >{{ $t("link.readmoreabout") }} {{ product.title }}</g-link
    >
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
  },
};
</script>

<style lang="scss" scoped>
.product {
  display: block;
  position: relative;
  &-image {
    border-radius: var(--border-radius);
  }
  &-text {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    padding: var(--spacing-sitepadding);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &-title {
    margin: 0;
    font-weight: 400;
    text-transform: uppercase;
  }
  &-link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    overflow: hidden;
    text-indent: -9999px;
    z-index: 0;
  }
}
.categories {
  list-style: none;
  margin: 0;
  padding: 0;
}
.category {
  display: inline-block;
  background: var(--color-paleyellow);
  padding: 0.2rem 0.5rem;
  border-radius: 5rem;
}
</style>
