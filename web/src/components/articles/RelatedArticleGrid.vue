<template>
  <section class="article-grid">
    <h2 v-if="heading" class="article-grid__title">
      <strong>{{ heading }}</strong>
    </h2>
    <h2 v-else-if="headingObject" class="article-grid__title">
      <block-content
        :blocks="headingObject._rawNo"
        v-if="headingObject._rawNo && $context.locale == 'no'"
        class="block-content body"
      />
      <block-content
        :blocks="headingObject._rawEn"
        v-else-if="headingObject._rawEn && $context.locale == 'en'"
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
    <div class="view-more">
      <g-link :to="$tp(`/articles`)">{{
        $t("navigation.showAllArticles")
      }}</g-link>
      &rarr;
    </div>
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
    heading: String,
    headingObject: Object,
  },
};
</script>

<style lang="scss" scoped>
.article-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: var(--spacing-sitepadding);
  padding: 0 0 calc(var(--spacing-sitepadding) * 2);
  margin-top: var(--spacing-sitepadding);
  background: var(--color-background);
  align-items: flex-start;
  border-top: 1px solid var(--color-text);
  border-radius: 0;
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
.view-more {
  grid-column: 1 / -1;
  margin-top: var(--spacing-sitepadding);
  text-align: right;
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
