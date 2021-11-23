<template>
  <Layout>
    <div class="about">
      <header class="about-header">
        <h1 class="about-title">{{ $page.about.title }}</h1>
        <div class="about-lead">{{ $page.about.lead }}</div>
      </header>
    </div>
  </Layout>
</template>

<page-query>
query {
  about: sanityAbout (id: "about") {
    title
    lead
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
