<template>
  <div class="city accordion" :class="{ open: open }">
    <h3 class="list-heading city-name" role="button" @click="open = !open">
      {{ city.node.name[$context.locale] }}
    </h3>
    <div class="city-content">
      <ul class="city-category-list">
        <li
          v-for="(category, index) in categories"
          :key="`category-${index}`"
          class="locations-category"
        >
          <div
            class="category-wrapper"
            v-if="
              getLocationsByCategory(city, category).length &&
                (!activeFilters.length ||
                  checkActiveFilter(category.node.title.en))
            "
          >
            <h4 class="list-heading category-name">
              {{ category.node.title[$context.locale] }}
            </h4>
            <ul class="location-list">
              <li
                v-for="(location, index) in getLocationsByCategory(
                  city,
                  category
                )"
                :key="`location-${index}`"
                class="location"
              >
                <h5 class="location-name">
                  {{ location.node.name }}
                </h5>
                <block-content
                  :blocks="location.node.text._rawNo"
                  v-if="location.node.text._rawNo && $context.locale == 'no'"
                  class="block-content"
                />
                <block-content
                  :blocks="location.node.text._rawEn"
                  v-else-if="
                    location.node.text._rawEn && $context.locale == 'en'
                  "
                  class="block-content"
                />
                <a v-if="location.node.website" :href="location.node.website">{{
                  location.node.website
                }}</a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BlockContent from "~/components/tools/BlockContent";

export default {
  components: {
    BlockContent,
  },
  props: {
    city: Object,
    categories: Array,
    locations: Array,
    activeFilters: Array,
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    getLocationsByCategory(city, category) {
      return this.locations.filter(
        (item) =>
          item.node.city.name.en === city.node.name.en &&
          item.node.category.title.en === category.node.title.en
      );
    },
    checkActiveFilter(category) {
      return this.activeFilters.includes(category);
    },
  },
};
</script>

<style lang="scss">
.city ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.city h2,
.city h3 {
  font-weight: 400;
  margin: 0.5rem 0;
}
.city h3 {
  margin: 0.5rem 0 1.5rem;
}
.city.accordion {
  position: relative;
  background: var(--color-palegreen);
  border-radius: var(--border-radius);
  margin-bottom: 0.5rem;
  &:hover,
  &.open {
    background: var(--color-paleyellow);
  }
  .list-heading {
    font-size: var(--font-size-m);
    margin: 0;
    //&.online,
    &.category-name {
      font-size: var(--font-size-xs);
      text-transform: uppercase;
      color: var(--color-gray);
      margin: 0 0 1rem;
    }
  }
}
.city-name {
  position: relative;
  padding: var(--spacing-sitepadding);
  &:after {
    content: "";
    display: block;
    width: 1rem;
    height: 1rem;
    background-image: url("/assets/graphics/icons/menu-icon__close.svg");
    background-size: 100%;
    position: absolute;
    top: calc(50% - 0.5rem);
    right: calc(var(--spacing-sitepadding) * 1.25);
    transform: rotate(45deg);
  }
}
.city-content {
  padding: var(--spacing-sitepadding);
}
.city .location-list {
  margin: 1rem 0 3rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}
.location {
  grid-column: span 1;
  &-name {
    font-size: var(--font-size-m);
    margin: 0 0 0.5rem;
  }
  p {
    font-size: var(--font-size-xs);
    color: var(--color-gray);
    margin: 0 0 0.5rem;
  }
  a {
    color: var(--color-text);
    &:hover {
      color: var(--color-green);
    }
  }
}
.city-content {
  display: none;
}
.open {
  .city-content {
    display: block;
  }
  .city-name {
    &:after {
      transform: rotate(0);
    }
  }
}

@media (max-width: 1200px) {
  .city .location-list {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
@media (max-width: 800px) {
  .city .location-list {
    grid-template-columns: 1fr 1fr;
  }
}
@media (max-width: 600px) {
  .city .location-list {
    grid-template-columns: 1fr;
  }
}
</style>
