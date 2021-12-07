<template>
  <Layout>
    <PageHeader />
    <ArticleGrid />
  </Layout>
</template>

<script>
import PageHeader from '~/components/PageHeader'
import ArticleGrid from '~/components/articles/ArticleGrid'

export default {
  components: {
    PageHeader,
    ArticleGrid
  },
  metaInfo: {
    title: 'Articles'
  }
}
</script>
