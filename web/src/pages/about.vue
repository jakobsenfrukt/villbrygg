<template>
  <Layout>
    <PageHeader :content="$page.about.pageHeader" />
    <main class="page-content page-content--grid about-content">
      <template v-if="$context.locale == 'no'">
        <block-content
          :blocks="$page.about.body._rawNo"
          v-if="$page.about.body._rawNo"
          class="block-content body"
        />
        <PageContent
          :content="$page.about.pageContent.pageContentNo.blocks"
          v-if="$page.about.pageContent.pageContentNo"
          class="content-blocks"
        />
      </template>
      <template v-else-if="$context.locale == 'en'">
        <block-content
          :blocks="$page.about.body._rawEn"
          v-if="$page.about.body._rawEn"
          class="block-content body"
        />
        <PageContent
          :content="$page.about.pageContent.pageContentEn.blocks"
          v-if="$page.about.pageContent.pageContentEn"
          class="content-blocks"
        />
      </template>
      <p v-if="$page.about.info" class="background-info">
        {{ $page.about.info[$context.locale] }}
      </p>
    </main>
  </Layout>
</template>

<page-query>
query {
  about: sanityAbout (id: "about") {
    title {
      no
      en
    }
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
    body {
      _rawEn
      _rawNo
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
        }
      }
    }
    info {
      no
      en
    }
  }
}
</page-query>

<script>
import PageHeader from "~/components/PageHeader";
import BlockContent from "~/components/tools/BlockContent";
import PageContent from "~/components/PageContent";

export default {
  components: {
    PageHeader,
    BlockContent,
    PageContent,
  },
  metaInfo: {
    title: "About",
  },
};
</script>

<style lang="scss" scoped>
.about-content {
  display: grid;
  grid-template-columns: repeat(10, 1fr);

  .lead {
    grid-column: 1 / span 4;
    font-size: var(--font-size-l);
    padding-right: calc(var(--spacing-sitepadding) * 2);
  }
  .body {
    grid-column: 5 / span 6;
    order: 2;
    padding: 0 var(--spacing-sitepadding) var(--spacing-sitepadding) 0;
  }
  .content-blocks {
    grid-column: 1 / -1;
    order: 3;
  }
  .background-info {
    grid-column: 1 / span 4;
    order: 1;
    margin-bottom: 3rem;
    padding-right: 3rem;
    font-size: var(--font-size-xs);
    color: var(--color-gray);
  }
}

@media (max-width: 800px) {
  .about-content {
    .lead,
    .body,
    .background-info {
      grid-column: 1 / -1;
      padding-right: 0;
    }
  }
}
</style>
