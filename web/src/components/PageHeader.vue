<template>
  <header class="page-header">
    <div class="text">
      <h1 class="heading" v-if="content.heading">
        {{ content.heading[$context.locale] }}
        <span v-if="content.subheading" class="subheading">{{
          content.subheading[$context.locale]
        }}</span>
      </h1>
      <p class="lead" v-if="content.text">
        {{ content.text[$context.locale] }}
      </p>
    </div>
    <template v-if="content.images">
      <g-image
        v-for="(image, index) in content.images"
        :key="`image-${index}`"
        :class="content.images.length === 1 ? 'single' : ''"
        :src="
          $urlForImage(image, $static.metadata.sanityOptions)
            .width(1440)
            .auto('format')
            .url()
        "
        :alt="image.alt[$context.locale]"
      />
    </template>
  </header>
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
export default {
  props: {
    content: {
      type: Object,
      require: false,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
.page-header {
  width: 100%;
  background: var(--color-background);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  padding: var(--spacing-sitepadding);
  padding-bottom: 4rem;
  display: grid;
  grid-template-columns: repeat(10, 1fr);

  .text {
    min-height: 20rem;
    grid-column: 5 / span 6;
    display: flex;
    align-items: flex-end;
    padding-bottom: 2rem;
  }
  .lead {
    font-size: 2rem;
    line-height: 1.2;
    padding-right: 2rem;
    max-width: 20em;
  }
  img {
    grid-column: span 6;
    border-radius: var(--border-radius);
    width: 100%;
    max-height: 86vh;
    object-fit: cover;
    &.single {
      grid-column: span 10;
    }
  }
  img:nth-of-type(even) {
    grid-column: span 4;
  }
}
.index .page-header {
  border-bottom-left-radius: var(--border-radius-l);
  border-bottom-right-radius: var(--border-radius-l);
}
</style>
