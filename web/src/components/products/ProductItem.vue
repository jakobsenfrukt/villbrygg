<template>
  <article class="product">
    <div class="product-image">
      <g-image
        v-if="product.mainImage"
        class="product-image"
        :src="$urlForImage(product.mainImage, $static.metadata.sanityOptions).height(500).width(800).auto('format').url()"
        :alt="product.mainImage.alt"
      />
    </div>
    <div class="product-text">
      <h3 class="product-title">{{ product.title }}</h3>
      <div class="product-lead" v-if="product._rawLead"><block-content :blocks="product._rawLead" /></div>
    </div>
    <g-link class="product-link" :to="$tp(`/products/${product.slug.current}`)">Link</g-link>
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
import BlockContent from '@/components/tools/BlockContent'

export default {
  components: {
    BlockContent
  },
  props: {
    product: Object
  }
}
</script>

<style lang="scss" scoped>
.product {
  display: block;
  position: relative;
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
</style>