<template>
  <Layout>
    <PageHeader :content="$page.about.pageHeader" />
    <main class="page-content about-content">
      <block-content
        :blocks="$page.about.body._rawNo"
        v-if="$page.about.body._rawNo && $context.locale == 'no'"
        class="block-content body"
      />
      <block-content
        :blocks="$page.about.body._rawEn"
        v-else-if="$page.about.body._rawEn && $context.locale == 'en'"
        class="block-content body"
      />
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

export default {
  components: {
    PageHeader,
    BlockContent,
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
  .background-info {
    grid-column: 1 / span 4;
    order: 1;
    padding-right: 3rem;
    font-size: var(--font-size-xs);
    color: var(--color-gray);
  }
}

@media (max-width: 800px) {
  .about-content {
    .lead,
    .body {
      grid-column: 1 / -1;
      padding-right: 0;
    }
  }
}
</style>
