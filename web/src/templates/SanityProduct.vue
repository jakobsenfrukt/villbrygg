<template>
  <Layout>
    <div class="product">
      <header class="product-header">
        <h1 class="product-title">{{ $page.product.title }}</h1>
        <img
          v-if="$page.product.mainImage"
          :alt="$page.product.mainImage.alt"
          :src="$urlForImage($page.product.mainImage, $page.metadata.sanityOptions).width(600).auto('format').url()"
        />
        <p class="lead product-lead">{{ $page.product.lead }}</p>
      </header>

      <div class="product-content">
        <block-content
          :blocks="$page.product._rawBody"
          v-if="$page.product._rawBody"
          class="block-content"
        />
      </div>
    </div>
  </Layout>
</template>

<page-query>
query product ($id: ID!) {
  metadata {
    sanityOptions {
      projectId
      dataset
    }
  }
  product: sanityProduct (id: $id) {
    title
    lead
    _rawBody
    mainImage {
      asset {
        _id
        url
      }
      caption
      alt
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
</page-query>

<script>
import BlockContent from '~/components/tools/BlockContent'

export default {
  components: {
    BlockContent
  },
  metaInfo() {
    return {
      title: this.$page.product.title,
      meta: [
        {
          name: 'description',
          content: this.$page.product.description
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.product {
  background: #fefefe;
}
</style>
