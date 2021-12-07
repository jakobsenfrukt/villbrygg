<template>
  <Layout>
    <PageHeader text="404" />
    <section>
      <h1>Oh no! This page is missing!</h1>
      <p class="lead">For some reason we can't find the page you're looking for. Did you check the spelling in the URL? If you know for sure there was supposed to be a page here, please let us know. If not, try again from our front page :)</p>
    </section>
    <p>&rarr; <a href="/">Go home</a></p>
  </Layout>
</template>

<script>
import PageHeader from '~/components/PageHeader'

export default {
  components: {
    PageHeader
  },
  metaInfo: {
    title: '404'
  }
}
</script>
