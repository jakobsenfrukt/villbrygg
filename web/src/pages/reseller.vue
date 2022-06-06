<template>
  <Layout>
    <PageHeader :content="$page.reseller.pageHeader" />
    <main class="page-content reseller-content">
      <p class="lead">
        Innhold kommer her
      </p>
      <!--<block-content
          :blocks="$page.reseller._rawBody"
          v-if="$page.reseller._rawBody"
          class="block-content"
        />-->
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
    title: "Reseller",
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
  .body {
    grid-column: 5 / span 6;
    padding: 0 var(--spacing-sitepadding) var(--spacing-sitepadding) 0;
  }
}

@media (max-width: 800px) {
  .reseller-content {
    .lead,
    .body {
      grid-column: 1 / -1;
      padding-right: 0;
    }
  }
}
</style>
