<template>
  <header class="page-header">
    <p class="lead" v-if="text">{{ text }}</p>
  </header>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    text: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
.page-header {
  width: 100%;
  min-height: 20rem;
  padding: var(--spacing-sitepadding);
  padding-bottom: 4rem;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  align-items: flex-end;

  .lead {
    grid-column: 5 / span 6;
    font-size: 2.8rem;
    line-height: 1.2;
    padding-right: 2rem;
  }
}
</style>
