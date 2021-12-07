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
      <ul class="categories">
        <li class="category">Category</li>
      </ul>
      <div class="article-date">{{ article.publishedAt }}</div>
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
  background: var(--color-palegreen);
  padding: 1.5rem;
  border-radius: var(--border-radius);
  &-image {
    border-radius: var(--border-radius);
  }
  &-date {
    color: var(--color-gray);
  }
  &-title {
    font-weight: 400;
    margin: .5rem 0;
  }
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
.categories {
  list-style: none;
  margin: 1rem 0 3rem;
  padding: 0;
}
.category {
  display: inline-block;
  background: var(--color-paleyellow);
  padding: .2rem .5rem;
  border-radius: 5rem;
}
</style>