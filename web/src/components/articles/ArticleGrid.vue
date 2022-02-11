<template>
  <section class="article-grid">
    <h2 class="article-grid__title">
      Learn more <strong>about our latest news and reviews</strong>
    </h2>
    <ArticleItem
      v-for="article in getLocaleArticles().slice(0, limit)"
      :key="article.id"
      :article="article.node"
    />

    <ArticleItem
      v-for="article in getLocaleArticles().slice(0, limit)"
      :key="article.id"
      :article="article.node"
    />
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
        publishedAt
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
import ArticleItem from "@/components/articles/ArticleItem";

export default {
  components: {
    ArticleItem,
  },
  props: {
    limit: {
      type: Number,
      default: 6,
    },
  },
  methods: {
    getLocaleArticles() {
      return this.$static.articles.edges.filter((article) => {
        return article.node.locale === this.$context.locale;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.article-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--spacing-sitepadding);
  padding: var(--spacing-sitepadding) var(--spacing-sitepadding)
    calc(var(--spacing-sitepadding) * 2);
  background: var(--color-background);
  border-radius: var(--border-radius-l);
  &__title {
    grid-column: 1 / -1;
    max-width: 14em;
    font-size: 2.4rem;
    line-height: 1.2;
    font-weight: 400;
    color: var(--color-lightgray);
    strong {
      font-weight: 400;
      color: var(--color-black);
    }
  }
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
