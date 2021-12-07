<template>
  <Layout>
    <div class="article">
      <header class="article-header">
        <h1 class="article-title">{{ $page.article.title }}</h1>
        <img
          v-if="$page.article.mainImage"
          :alt="$page.article.mainImage.alt"
          :src="$urlForImage($page.article.mainImage, $page.metadata.sanityOptions).width(600).auto('format').url()"
        />
        <p class="lead article-lead">{{ $page.article.lead }}</p>
      </header>

      <div class="article-content">
        <block-content
          :blocks="$page.article._rawBody"
          v-if="$page.article._rawBody"
          class="block-content"
        />
      </div>
    </div>
  </Layout>
</template>

<page-query>
query article ($id: ID!) {
  metadata {
    sanityOptions {
      projectId
      dataset
    }
  }
  article: sanityArticle (id: $id) {
    title
    lead
    mainImage {
      asset {
        _id
        url
      }
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
      title: this.$page.article.title,
      meta: [
        {
          name: 'description',
          content: this.$page.article.description
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  background: #fefefe;
}
</style>
