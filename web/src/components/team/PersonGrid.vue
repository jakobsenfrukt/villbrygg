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
  grid-gap: 0.75rem;
  padding: var(--spacing-sitepadding) var(--spacing-sitepadding)
    calc(var(--spacing-sitepadding) * 2);

  list-style: none;
  margin: 0;
  padding: 0;
}
@media (max-width: 1000px) {
  .person-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
