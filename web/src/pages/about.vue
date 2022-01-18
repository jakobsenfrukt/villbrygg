<template>
  <Layout>
    <PageHeader :text="$page.about.lead[$context.locale]" />
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
    lead {
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
.about {
}
</style>
