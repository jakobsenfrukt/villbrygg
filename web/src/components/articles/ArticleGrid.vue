<template>
  <section class="article-grid">
    <h2 v-if="heading" class="article-grid__title">
      <block-content
        :blocks="heading._rawNo"
        v-if="heading._rawNo && $context.locale == 'no'"
        class="block-content body"
      />
      <block-content
        :blocks="heading._rawEn"
        v-else-if="heading._rawEn && $context.locale == 'en'"
        class="block-content body"
      />
    </h2>
    <template v-if="items">
      <ArticleItem
        v-for="article in items.slice(0, limit)"
        :key="article.id"
        :article="article"
      />
    </template>
    <template v-else>
      <ArticleItem
        v-for="article in getLocaleArticles().slice(0, limit)"
        :key="article.id"
        :article="article.node"
      />
    </template>
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
        categories {
          title {
            no
            en
          }
          color {
            hex
          }
        }
        lead
        mainImages {
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
import BlockContent from "@/components/tools/BlockContent";

export default {
  components: {
    ArticleItem,
    BlockContent,
  },
  props: {
    items: {
      type: Array,
      default: undefined,
    },
    limit: {
      type: Number,
      default: 6,
    },
    heading: Object,
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

<style lang="scss">
.article-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: var(--spacing-sitepadding);
  padding: var(--spacing-sitepadding) var(--spacing-sitepadding)
    calc(var(--spacing-sitepadding) * 2);
  background: var(--color-background);
  border-radius: var(--border-radius-l);
  &__title {
    grid-column: 1 / -1;
    max-width: 14em;
    font-size: var(--font-size-l);
    line-height: 1.2;
    font-weight: 400;
    color: var(--color-lightgray);
    padding-bottom: 0.75rem;
    strong {
      font-weight: 400;
      color: var(--color-black);
    }
    p {
      margin-bottom: 0;
    }
  }
}

@media (max-width: 1000px) {
  .article-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 500px) {
  .article-grid {
    grid-template-columns: 1fr;
  }
}
</style>
