<template>
  <Layout>
    <PageHeader :content="$page.reseller.pageHeader" />
    <main class="page-content-wrapper">
      <div class="page-content page-content--grid reseller-content">
        <template v-if="$context.locale == 'no'">
          <block-content
            :blocks="$page.reseller.body._rawNo"
            v-if="$page.reseller.body && $page.reseller.body._rawNo"
            class="block-content body"
          />
        </template>
        <template v-else-if="$context.locale == 'en'">
          <block-content
            :blocks="$page.reseller.body._rawEn"
            v-if="$page.reseller.body && $page.reseller.body._rawEn"
            class="block-content body"
          />
        </template>
        <section class="contactform"><ContactForm /></section>
        <template v-if="$context.locale == 'no'">
          <PageContent
            :content="$page.reseller.pageContent.pageContentNo.blocks"
            v-if="
              $page.reseller.pageContent &&
                $page.reseller.pageContent.pageContentNo
            "
            class="content-blocks"
          />
        </template>
        <template v-else-if="$context.locale == 'en'">
          <PageContent
            :content="$page.reseller.pageContent.pageContentEn.blocks"
            v-if="
              $page.reseller.pageContent &&
                $page.reseller.pageContent.pageContentEn
            "
            class="content-blocks"
          />
        </template>
      </div>
    </main>
  </Layout>
</template>

<page-query>
query {
  reseller: sanityReseller (id: "reseller") {
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
      _rawNo
      _rawEn
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
import PageHeader from "~/components/PageHeader";
import BlockContent from "~/components/tools/BlockContent";
import ContactForm from "~/components/ContactForm";

export default {
  components: {
    PageHeader,
    BlockContent,
    ContactForm,
  },
  metaInfo() {
    return {
      title:
        this.$context.locale === "no"
          ? "Bli en forhandler"
          : "Become a reseller",
      meta: [
        {
          name: "description",
          content: this.$page.reseller.pageHeader.text
            ? this.$page.reseller.pageHeader.text[this.$context.locale]
            : this.$page.general.seo.description[this.$context.locale],
        },
        {
          name: "og:image",
          key: "og:image",
          content: this.$page.reseller.pageHeader.images.length
            ? this.$page.reseller.pageHeader.images[0].asset.url
            : this.$page.general.seo.ogimg.asset.url,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.reseller-content {
  display: grid;
  grid-template-columns: repeat(10, 1fr);

  .lead {
    grid-column: 1 / span 4;
    font-size: var(--font-size-l);
    padding-right: calc(var(--spacing-sitepadding) * 2);
  }
  .body,
  .contactform {
    grid-column: 5 / span 6;
    padding: 0 var(--spacing-sitepadding) var(--spacing-sitepadding) 0;
  }

  .contactform {
    order: 3;
  }
}

@media (max-width: 800px) {
  .reseller-content {
    .lead,
    .body,
    .contactform {
      grid-column: 1 / -1;
      padding-right: 0;
    }
  }
}
</style>
