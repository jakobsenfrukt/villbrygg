<template>
  <Layout>
    <div class="article article-page">
      <header class="article-header-wrapper">
        <div class="article-header">
          <div class="text">
            <h1 class="heading">{{ $page.article.title }}</h1>
          </div>
          <template v-if="$page.article.mainImages">
            <g-image
              v-for="(image, index) in $page.article.mainImages"
              :key="`image-${index}`"
              :class="$page.article.mainImages.length === 1 ? 'single' : ''"
              :src="
                $urlForImage(image, $page.metadata.sanityOptions)
                  .width(1440)
                  .auto('format')
                  .url()
              "
              :alt="image.alt ? image.alt : ''"
            />
          </template>
          <ul class="categories">
            <li
              class="category"
              v-for="(category, index) in $page.article.categories"
              :key="`category-${index}`"
              :style="`background: ${category.color.hex}`"
            >
              <g-link
                :to="
                  `${$tp($t('slug.articles'))}?category=${category.title.en}`
                "
                >{{ category.title[$context.locale] }}</g-link
              >
            </li>
          </ul>
        </div>
      </header>

      <main class="page-content-wrapper">
        <div class="page-content page-content--grid article-content">
          <p class="lead">
            {{ $page.article.lead }}
          </p>
          <block-content
            :blocks="$page.article._rawBody"
            v-if="$page.article._rawBody"
            class="block-content body"
          />
          <PageContent
            :content="$page.article.pageContent.blocks"
            v-if="$page.article.pageContent"
            class="content-blocks"
          />
          <ArticleGrid
            v-if="$page.article.related.length"
            :heading="$t('headings.related')"
            :items="$page.article.related"
            :limit="3"
            class="article-grid"
          />
        </div>
      </main>
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
    categories {
      title {
        no
        en
      }
      color {
        hex
      }
    }
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
    _rawBody
    pageContent {
      blocks {
        ... on SanityBodyBlock {
          _type
          _rawBody
        }
        ... on SanityTextBlock {
          _type
          text
        }
        ... on SanityFigure {
          _type
          asset {
            _id
            url
          }
          alt
          caption
        }
        ... on SanityImageAndText {
          _type
          image {
            asset {
              _id
              url
            }
            alt
            caption
          }
          text
        }
        ... on SanityFigureTwoColumn {
          _type
          images {
            asset {
              _id
              url
            }
            alt
            caption
          }
        }
      }
    }
    related {
      title
      slug {
        current
      }
      publishedAt
      locale
      lead
      categories {
        title {
          no
          en
        }
        color {
          hex
        }
      }
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
import BlockContent from "~/components/tools/BlockContent";
import PageContent from "~/components/PageContent";
import ArticleGrid from "~/components/articles/RelatedArticleGrid";

export default {
  components: {
    BlockContent,
    PageContent,
    ArticleGrid,
  },
  metaInfo() {
    return {
      title: this.$page.article.title,
      meta: [
        {
          name: "description",
          content: this.$page.article.description,
        },
      ],
    };
  },
  metaInfo() {
    return {
      title: this.$page.article.title,
      meta: [
        {
          name: "description",
          content: this.$page.article.lead
            ? this.$page.article.lead
            : this.$page.general.seo.description,
        },
        {
          name: "og:image",
          key: "og:image",
          content: this.$page.article.mainImages.length
            ? this.$page.article.mainImages[0].asset.url
            : this.$page.general.seo.ogimg.asset.url,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.article-header-wrapper {
  background: var(--color-background);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.article-header {
  width: 100%;
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding: var(--spacing-sitepadding);
  padding-bottom: 2rem;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: calc(var(--spacing-sitepadding) / 2);

  .text {
    min-height: 13rem;
    grid-column: 5 / span 6;
    display: flex;
    align-items: flex-end;
    padding-bottom: 2rem;
  }
  .heading {
    font-weight: inherit;
    font-size: var(--font-size-xl);
    line-height: 1.2;
    max-width: 14em;
  }
  img {
    grid-column: span 6;
    border-radius: var(--border-radius);
    width: 100%;
    height: 100%;
    max-height: 86vh;
    object-fit: cover;
    &.single {
      grid-column: span 10;
    }
  }
  img:nth-of-type(even) {
    grid-column: span 4;
    grid-row: span 2;
  }
}
.article-content {
  display: grid;
  grid-template-columns: repeat(10, 1fr);

  .lead {
    grid-column: 1 / span 4;
    font-size: var(--font-size-l);
    padding-right: calc(var(--spacing-sitepadding) * 2);
  }
  .body {
    grid-column: 5 / span 6;
    padding: 0 var(--spacing-sitepadding) var(--spacing-sitepadding) 0;
  }
}

.categories {
  grid-column: span 6;
  margin-top: 0;
}

.content-blocks {
  order: 3;
}
.article-grid {
  grid-column: 1 / -1;
  order: 4;
}

@media (max-width: 800px) {
  .article-header {
    .text {
      grid-column: 1 / -1;
    }
    /*img {
      grid-column: span 9;
      max-height: 40vh;
    }
    img:nth-of-type(even) {
      grid-column: 4 / span 7;
    }*/
  }
  .article-content {
    .lead,
    .body {
      grid-column: 1 / -1;
      padding-right: 0;
    }
  }
}
</style>
