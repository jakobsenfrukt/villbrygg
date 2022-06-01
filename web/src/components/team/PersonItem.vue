<template>
  <li class="person">
    <div class="person-image">
      <g-image
        v-if="person.image"
        class="article-image"
        :src="
          $urlForImage(person.image, $static.metadata.sanityOptions)
            .width(420)
            .height(600)
            .auto('format')
            .url()
        "
        :alt="person.image.alt[$context.locale]"
      />
    </div>
    <h2 class="person-name">
      {{ person.name }}
      <span class="person-title">{{ person.title[$context.locale] }}</span>
    </h2>
  </li>
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
    person: Object,
  },
};
</script>

<style lang="scss" scoped>
.person {
  &-image {
    img {
      border-radius: var(--border-radius);
    }
  }
  &-name,
  &-title {
    display: block;
    font-size: var(--font-size-m);
  }
  &-title {
    color: var(--color-lightgray);
  }
}
</style>
