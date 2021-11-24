<template>
  <Layout>
    <div class="about">
      <header class="about-header">
        <h1 class="about-title">{{ $page.about.title[$context.locale] }}</h1>
      </header>
    </div>
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
import BlockContent from '~/components/tools/BlockContent'

export default {
  components: {
    BlockContent
  },
  metaInfo: {
    title: 'About'
  }
}
</script>

<style lang="scss" scoped>
.about {
}
</style>
