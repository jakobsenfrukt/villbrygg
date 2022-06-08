<template>
  <article class="article">
    <div class="article-image">
      <g-image
        v-if="article.mainImages"
        class="article-image"
        :src="
          $urlForImage(article.mainImages[0], $static.metadata.sanityOptions)
            .width(400)
            .auto('format')
            .url()
        "
        :alt="article.mainImages[0].alt"
      />
    </div>
    <div class="article-text">
      <ul class="categories">
        <li
          class="category"
          v-for="(category, index) in article.categories"
          :key="`category-${index}`"
          :style="`background: ${category.color.hex}`"
        >
          {{ category.title[$context.locale] }}
        </li>
      </ul>
      <div class="article-date">{{ getDate(article.publishedAt) }}</div>
      <h3 class="article-title">{{ article.title }}</h3>
      <div class="article-lead" v-if="article._rawLead">
        <block-content :blocks="article._rawLead" />
      </div>
    </div>
    <g-link class="article-link" :to="$tp(`/articles/${article.slug.current}`)"
      >Link</g-link
    >
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
import BlockContent from "@/components/tools/BlockContent";

export default {
  components: {
    BlockContent,
  },
  props: {
    article: Object,
  },
  methods: {
    getDate(publishDate) {
      let date = new Date(publishDate);
      let year = date.getFullYear();
      if (this.$context.locale === "en") {
        let shortMonth = date.toLocaleString("en-us", { month: "short" });
        return shortMonth + " " + year;
      }
      let shortMonth = date.toLocaleString("no-nb", { month: "short" });
      return shortMonth + " " + year;
    },
  },
};
</script>

<style lang="scss" scoped>
.article {
  position: relative;
  background: var(--color-palegreen);
  padding: calc(var(--spacing-sitepadding) * 0.7);
  border-radius: var(--border-radius);
  transition: background 0.2s ease;
  &-image {
    border-radius: var(--border-radius);
  }
  &-date {
    color: var(--color-gray);
    text-transform: uppercase;
    font-size: var(--font-size-xs);
    margin-bottom: 1rem;
  }
  &-title {
    font-weight: 400;
    margin: 0.5rem 0;
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
  &:hover {
    background: var(--color-paleyellow);
  }
}
</style>
