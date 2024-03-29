<template>
  <Layout>
    <PageHeader :content="$page.articlepage.pageHeader" />
    <main class="page-content-wrapper">
      <div class="page-content">
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
          <div class="showmore">
            <button
              class="button"
              @click="showMore()"
              v-if="filteredArticles.length > limit"
            >
              {{ $t("navigation.showmore") }}
            </button>
          </div>
        </section>
      </div>
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
  general: sanityGeneral(id: "general") {
    seo {
      ogimg {
        asset {
          url
        }
      }
      description
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
      this.$router.push({ query: { category: undefined } });
    },
    changeFilter(category) {
      this.showAll = false;
      this.activeFilter = category;
      if (this.$route.query.category !== category) {
        this.$router.push({ query: { category: category } });
      }
    },
    showMore() {
      this.limit += this.limit;
    },
  },
  mounted() {
    if (this.$route.query.category) {
      this.changeFilter(this.$route.query.category);
    }
    console.log("category", this.$route.query.category);
  },
  metaInfo() {
    return {
      title: this.$context.locale === "no" ? "Artikler" : "Articles",
      meta: [
        {
          name: "description",
          content: this.$page.articlepage.pageHeader.text
            ? this.$page.articlepage.pageHeader.text[this.$context.locale]
            : this.$page.general.seo.description[this.$context.locale],
        },
        {
          name: "og:image",
          key: "og:image",
          content: this.$page.articles.edges[0].node.mainImages.length
            ? this.$page.articles.edges[0].node.mainImages[0].asset.url
            : this.$page.general.seo.ogimg.asset.url,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.article-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: var(--spacing-sitepadding);
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
.showmore {
  grid-column: 1 / -1;

  .button {
    display: block;
    margin: 0 auto;
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
