<template>
  <section class="article-grid">
    <ArticleItem
      v-for="article in getLocaleArticles().slice(0, limit)"
      :key="article.id"
      :article="article.node"
    />
  </section>
</template>

<static-query>
query {
  articles: allSanityArticle(
    filter: {slug: {current: {ne: null}}, publishedAt: {ne: null}},
    sortBy: "publishedAt", order: DESC
  ) {
    edges {
      node {
        id
        title
        slug {
          current
        }
        locale
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
  }
}
</static-query>

<script>
import ArticleItem from '@/components/articles/ArticleItem'

export default {
  components: {
    ArticleItem
  },
  props: {
    limit: {
      type: Number,
      default: 6
    }
  },
  methods: {
    getLocaleArticles() {
      return this.$static.articles.edges.filter(article => {
        return article.node.locale === this.$context.locale
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.article-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 4rem;
  padding: 4rem;
}
/*@media (min-width: 1800px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}*/
@media (max-width: 1200px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 640px) {
  .product-grid {
    grid-template-columns: repeat(1, 1fr);
    padding: 2rem;
  }
}
</style>