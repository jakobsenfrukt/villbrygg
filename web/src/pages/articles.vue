<template>
  <Layout>
    <PageHeader :content="$page.articlepage.pageHeader" />
    <main class="page-content">
      <ul class="category-list">
        <li>
          <button :class="{ active: showAll }" @click="resetFilter()">
            {{ $t("navigation.showall") }}
          </button>
        </li>
        <li
          v-for="(category, index) in $page.categories.edges"
          :key="`category-${index}`"
        >
          <button
            @click="changeFilter(category.node.title.en)"
            class="category-button"
            :class="activeFilter === category.node.title.en ? 'active' : ''"
          >
            {{ category.node.title[$context.locale] }}
          </button>
        </li>
      </ul>
      <section class="article-grid">
        <ArticleItem
          v-for="article in filteredArticles.slice(0, limit)"
          :key="article.id"
          :article="article.node"
        />
      </section>
    </main>
  </Layout>
</template>

<page-query>
query {
  articlepage: sanityArticlepage (id: "articlepage") {
    pageHeader {
      heading {
        no
        en
      }
      subheading {
        no
        en
      }
      text {
        no
        en
      }
      images {
        asset {
          _id
          url
        }
        alt {
          no
          en
        }
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
  categories: allSanityArticlesCategory(sortBy: "title", order: ASC) {
    edges {
      node {
        title {
          no
          en
        }
        color {
          hex
        }
      }
    }
  }
}
</page-query>

<script>
import PageHeader from "@/components/PageHeader";
import ArticleItem from "@/components/articles/ArticleItem";
import BlockContent from "@/components/tools/BlockContent";

export default {
  components: {
    PageHeader,
    ArticleItem,
    BlockContent,
  },
  data() {
    return {
      showAll: true,
      activeFilter: undefined,
      limit: 12,
    };
  },
  computed: {
    filteredArticles() {
      const articles = this.getLocaleArticles();
      const activeFilter = this.activeFilter;
      let filtered = articles;
      if (activeFilter) {
        filtered = filtered.filter((item) => {
          const categories = item.node.categories.map(
            (category) => category.title.en
          );
          console.log(categories);
          return categories.some((category) => category === activeFilter);
        });
      }
      return filtered;
    },
  },
  methods: {
    getLocaleArticles() {
      return this.$page.articles.edges.filter((article) => {
        return article.node.locale === this.$context.locale;
      });
    },
    resetFilter() {
      (this.showAll = true), (this.activeFilter = undefined);
    },
    changeFilter(category) {
      this.showAll = false;
      this.activeFilter = category;
    },
  },
};
</script>

<style lang="scss" scoped>
.article-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-sitepadding);
  margin-bottom: 6rem;
  background: var(--color-background);
  border-radius: var(--border-radius-l);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  padding: 0;
  align-items: flex-start;
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
.category-button {
  &:hover,
  &.active {
    background: var(--color-active) !important;
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
