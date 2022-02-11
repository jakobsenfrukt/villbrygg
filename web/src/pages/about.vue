<template>
  <Layout>
    <PageHeader :content="$page.about.pageHeader" />
    <main class="page-content">
      Content goes here
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
.about {
}
</style>
