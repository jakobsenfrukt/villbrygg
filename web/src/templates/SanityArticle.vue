<template>
  <Layout>
    <div class="article">
      <header class="article-header">
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
            :alt="image.alt[$context.locale]"
          />
        </template>
        <ul class="categories">
          <li
            class="category"
            v-for="(category, index) in $page.article.categories"
            :key="`category-${index}`"
            :style="`background: ${category.color.hex}`"
          >
            {{ category.title[$context.locale] }}
          </li>
        </ul>
      </header>

      <main class="page-content page-content--grid article-content">
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
  }
}
</page-query>

<script>
import BlockContent from "~/components/tools/BlockContent";
import PageContent from "~/components/PageContent";

export default {
  components: {
    BlockContent,
    PageContent,
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
};
</script>

<style lang="scss" scoped>
.article-header {
  width: 100%;
  background: var(--color-background);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
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
