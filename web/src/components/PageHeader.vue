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
  padding-bottom: 2rem;
  margin-bottom: -1px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: calc(var(--spacing-sitepadding) / 2);

  .text {
    min-height: 13rem;
    grid-column: 5 / span 6;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
  }
  .heading {
    width: 100%;
    font-weight: inherit;
    font-size: var(--font-size-xl);
    line-height: 1.2;
    max-width: 14em;
  }
  .subheading {
    display: block;
    color: var(--color-lightgray);
  }
  .lead {
    font-size: var(--font-size-l);
    line-height: 1.2;
    max-width: 20em;
  }
  img {
    grid-column: span 6;
    border-radius: var(--border-radius);
    width: 100%;
    max-height: 86vh;
    object-fit: cover;
    margin-top: 2rem;
    &.single {
      grid-column: span 10;
    }
  }
  img:nth-of-type(even) {
    grid-column: span 4;
  }
  &.noimage {
    //padding-bottom: 0;
    .lead {
      margin-bottom: 0;
    }
  }
}
.index .page-header {
  border-bottom-left-radius: var(--border-radius-l);
  border-bottom-right-radius: var(--border-radius-l);
}

@media (max-width: 1110px) {
  .page-header {
    .text {
      grid-column: 1 / -1;
    }
  }
}
@media (max-width: 800px) {
  .page-header {
    img {
      grid-column: 1 / -1;
    }
    img:nth-of-type(even) {
      display: none;
    }
  }
}
</style>
