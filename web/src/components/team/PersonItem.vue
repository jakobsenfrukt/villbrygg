<template>
  <li class="person">
    <div class="person-image">
      <g-image
        v-if="person.image"
        class="article-image"
        :src="
          $urlForImage(person.image, $static.metadata.sanityOptions)
            .width(420)
            .height(500)
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
    <a :href="`mailto:${person.email}`" class="person-email" target="_blank">{{
      person.email
    }}</a>
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
    margin-bottom: 0.75rem;
    img {
      border-radius: var(--border-radius);
    }
  }
  &-name,
  &-title,
  a {
    display: block;
    font-size: var(--font-size-s);
    margin: 0;
  }
  &-title {
    color: var(--color-gray);
  }
  a {
    color: var(--color-lightgray);
    &:hover {
      color: var(--color-hover);
    }
  }
}
</style>
