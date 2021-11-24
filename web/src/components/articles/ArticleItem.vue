<template>
  <article class="article">
    <div class="article-image">
      <g-image
        v-if="article.mainImage"
        class="article-image"
        :src="$urlForImage(article.mainImage, $static.metadata.sanityOptions).height(600).width(400).auto('format').url()"
        :alt="article.mainImage.alt"
      />
    </div>
    <div class="article-text">
      <h3 class="article-title">{{ article.title }}</h3>
      <div class="article-lead" v-if="article._rawLead"><block-content :blocks="article._rawLead" /></div>
    </div>
    <g-link class="article-link" :to="$tp(`/articles/${article.slug.current}`)">Link</g-link>
  </article>
</template>

<static-query>
{
  metadata {
    sanityOptions {
      projectId
      dataset
    }
  }
}
</static-query>

<script>
import BlockContent from '@/components/tools/BlockContent'

export default {
  components: {
    BlockContent
  },
  props: {
    article: Object
  }
}
</script>

<style lang="scss" scoped>
.article {
  display: block;
  position: relative;
  &-link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    overflow: hidden;
    text-indent: -9999px;
    z-index: 0;
  }
}
</style>