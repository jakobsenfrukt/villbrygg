<template>
  <ul class="person-grid">
    <PersonItem
      v-for="(person, index) in content"
      :key="index"
      :person="person"
    />
  </ul>
</template>

<script>
import PersonItem from "@/components/team/PersonItem";

export default {
  components: {
    PersonItem,
  },
  props: {
    content: Array,
  },
};
</script>

<style lang="scss" scoped>
.person-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 0.75rem;
  row-gap: var(--spacing-sitepadding);
  padding: var(--spacing-sitepadding) var(--spacing-sitepadding)
    calc(var(--spacing-sitepadding) * 2);

  list-style: none;
  margin: 0 0 calc(var(--spacing-sitepadding) * 2);
  padding: 0;
}
@media (max-width: 1000px) {
  .person-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
