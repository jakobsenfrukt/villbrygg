<template>
  <Layout>
    <PageHeader :content="$page.privacy.pageHeader" />
    <main class="page-content page-content--grid privacy-content">
      <template v-if="$context.locale == 'no'">
        <block-content
          :blocks="$page.privacy.body._rawNo"
          v-if="$page.privacy.body._rawNo"
          class="block-content body"
        />
      </template>
      <template v-else-if="$context.locale == 'en'">
        <block-content
          :blocks="$page.privacy.body._rawEn"
          v-if="$page.privacy.body._rawEn"
          class="block-content body"
        />
      </template>
    </main>
  </Layout>
</template>

<page-query>
query {
  privacy: sanityPrivacy (id: "privacy") {
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
  }
}
</page-query>

<script>
import PageHeader from "~/components/PageHeader";
import BlockContent from "~/components/tools/BlockContent";

export default {
  components: {
    PageHeader,
    BlockContent,
  },
  metaInfo: {
    title: "Privacy",
  },
};
</script>

<style lang="scss" scoped>
.privacy-content {
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
  .privacy-content {
    .lead,
    .body,
    .background-info {
      grid-column: 1 / -1;
      padding-right: 0;
    }
  }
}
</style>
