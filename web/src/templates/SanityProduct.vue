<template>
  <Layout>
    <header class="product-header">
      <div class="text">
        <h1 class="heading">{{ $page.product.title }}</h1>
      </div>
      <img
        v-if="$page.product.mainImage"
        :alt="$page.product.mainImage.alt[$context.locale]"
        :src="
          $urlForImage($page.product.mainImage, $page.metadata.sanityOptions)
            .width(600)
            .auto('format')
            .url()
        "
      />
    </header>

    <main class="page-content page-content--grid product-content">
      <p class="lead">
        {{ $page.product.lead[$context.locale] }}
      </p>
      <template v-if="$context.locale == 'no'">
        <block-content
          :blocks="$page.product.body._rawNo"
          v-if="$page.product.body._rawNo"
          class="block-content body"
        />
        <PageContent
          :content="$page.product.pageContent.pageContentNo.blocks"
          v-if="
            $page.product.pageContent && $page.product.pageContent.pageContentNo
          "
          class="content-blocks"
        />
      </template>
      <template v-else-if="$context.locale == 'en'">
        <block-content
          :blocks="$page.product.body._rawEn"
          v-if="$page.product.body._rawEn"
          class="block-content body"
        />
        <PageContent
          :content="$page.product.pageContent.pageContentEn.blocks"
          v-if="
            $page.product.pageContent && $page.product.pageContent.pageContentEn
          "
          class="content-blocks"
        />
      </template>
    </main>
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
    lead {
      no
      en
    }
    body {
      _rawNo
      _rawEn
    }
    mainImage {
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
    pageContent {
      pageContentNo {
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
          ... on SanityImageGallery {
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
      pageContentEn {
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
          ... on SanityImageGallery {
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
      title: this.$page.product.title,
      meta: [
        {
          name: "description",
          content: this.$page.product.description,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.product-header {
  width: 100%;
  background: var(--color-background);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  padding: var(--spacing-sitepadding);
  padding-bottom: 2rem;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: calc(var(--spacing-sitepadding) / 2);

  .text {
    order: 2;
    min-height: 16rem;
    grid-column: 5 / span 6;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    padding-bottom: 2rem;
  }
  .heading {
    width: 100%;
    font-weight: inherit;
    font-size: var(--font-size-xl);
    line-height: 1.2;
  }
  .lead {
    font-size: var(--font-size-m);
    line-height: 1.2;
    max-width: 20em;
  }
  img {
    order: 1;
    grid-column: 1 / span 4;
    border-radius: var(--border-radius);
    width: 100%;
    max-height: 86vh;
    object-fit: cover;
  }
  img:nth-of-type(even) {
    grid-column: span 4;
  }
}

.product-content {
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

@media (max-width: 800px) {
  .product-content {
    .lead,
    .body {
      grid-column: 1 / -1;
      padding-right: 0;
    }
  }
}
</style>
