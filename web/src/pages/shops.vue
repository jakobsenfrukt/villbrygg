<template>
  <Layout>
    <PageHeader :content="$page.shops.pageHeader" />
    <main class="page-content">
      <ul class="category-list">
        <li>
          <button :class="{ active: showAll }" @click="resetFilter()">
            {{ $t("navigation.showall") }}
          </button>
        </li>
        <li
          v-for="(category, index) in sortedCategories[$context.locale]"
          :key="`category-${index}`"
        >
          <button
            @click="changeFilter(category.node.title.en)"
            :class="
              activeFilters.includes(category.node.title.en) ? 'active' : ''
            "
          >
            {{ category.node.title[$context.locale] }}
          </button>
        </li>
      </ul>
      <div class="search">
        <label>{{ $t("navigation.shopSearchLabel") }}</label>
        <input
          type="text"
          :placeholder="$t('navigation.shopSearchPlaceholder')"
          v-model="searchQuery"
        />
      </div>
      <ul class="countries">
        <li
          v-for="(country, index) in $page.countries.edges"
          :key="`country-${index}`"
          class="country"
        >
          <h2 class="list-heading country-name">
            {{ country.node.name[$context.locale] }}
          </h2>

          <ul class="country-list">
            <li
              v-if="
                !searchQuery &&
                  getOnlineShopsByCountry(country).length &&
                  (showAll || checkActiveFilter('Online'))
              "
            >
              <Online :shops="getOnlineShopsByCountry(country)" />
            </li>
            <li v-for="(city, index) in visibleCities" :key="`city-${index}`">
              <City
                :city="city"
                :locations="getLocationsByCity(city)"
                :categories="sortedCategories[$context.locale]"
                :activeFilters="activeFilters"
              />
            </li>
          </ul>
        </li>
      </ul>
    </main>
  </Layout>
</template>

<page-query>
query {
  shops: sanityShops (id: "shops") {
    pageHeader {
      heading {
        no
        en
      }
      subheading {
        no
        en
      }
      text {
        no
        en
      }
      images {
        asset {
          _id
          url
        }
        alt {
          no
          en
        }
        hotspot {
          x
          y
          height
          width
        }
        crop {
          top
          bottom
          left
          right
        }
      }
    }
  }
  locations: allSanityLocation(sortBy: "name", order: ASC) {
    edges {
      node {
        category {
          title {
            no
            en
          }
        }
        city {
          name {
            no
            en
          }
        }
        name
        website
        text {
          _rawNo
          _rawEn
        }
      }
    }
  }
  onlineShops: allSanityOnlineShop(sortBy: "name", order: ASC) {
    edges {
      node {
        category {
          title {
            no
            en
          }
        }
        countries {
          name {
            no
            en
          }
        }
        name
        website
        text {
          _rawNo
          _rawEn
        }
      }
    }
  }
  countries: allSanityShopsCountry(sortBy: "name", order: ASC) {
    edges {
      node {
        name {
          no
          en
        }
      }
    }
  }
  cities: allSanityShopsCity(sortBy: "name", order: ASC) {
    edges {
      node {
        name {
          no
          en
        }
      }
    }
  }
  categories: allSanityShopsCategory(sortBy: "title", order: ASC) {
    edges {
      node {
        title {
          no
          en
        }
      }
    }
  }
}
</page-query>

<script>
import PageHeader from "~/components/PageHeader";
import City from "~/components/shops/City";
import Online from "~/components/shops/Online";

export default {
  components: {
    PageHeader,
    City,
    Online,
  },
  data() {
    return {
      showAll: true,
      activeFilters: [],
      searchQuery: undefined,
    };
  },
  computed: {
    visibleCities() {
      let cities = this.$page.cities.edges;
      if (this.searchQuery) {
        // show cities matching search query
        cities = cities.filter(
          (item) =>
            item.node.name.en.toLowerCase().includes(this.searchQuery) ||
            item.node.name.no.toLowerCase().includes(this.searchQuery)
        );
      }
      /*if (this.activeFilters.length >= 1) {
        // check each city if it contains locations matching the current filters
        cities = cities.filter((city) =>
          this.activeFilters.forEach((category) =>
            this.getLocationsByCategory(city, category)
          )
        );
      }*/
      return cities;
    },
    sortedCategories() {
      const categories = this.$page.categories.edges;
      const sortedCategories = {
        en: categories
          .slice()
          .sort((a, b) => a.node.title.en.localeCompare(b.node.title.en)),
        no: categories
          .slice()
          .sort((a, b) => a.node.title.no.localeCompare(b.node.title.no)),
      };
      return sortedCategories;
    },
  },
  methods: {
    getOnlineShopsByCountry(country) {
      return this.$page.onlineShops.edges.filter((item) =>
        item.node.countries.some(
          (itemCountry) => itemCountry.name.en === country.node.name.en
        )
      );
    },
    getLocationsByCity(city) {
      return this.$page.locations.edges.filter(
        (item) => item.node.city.name.en === city.node.name.en
      );
    },
    getLocationsByCategory(city, category) {
      return this.$page.locations.edges.filter(
        (item) =>
          item.node.city.name.en === city.node.name.en &&
          item.node.category.title.en === category.node.title.en
      );
    },
    resetFilter() {
      (this.showAll = true), (this.activeFilters = []);
    },
    changeFilter(category) {
      this.showAll = false;
      if (this.activeFilters.includes(category)) {
        const index = this.activeFilters.indexOf(category);
        if (index > -1) {
          this.activeFilters.splice(index, 1);
        }
        if (!this.activeFilters.length) {
          this.showAll = true;
        }
      } else {
        this.activeFilters.push(category);
      }
    },
    checkActiveFilter(category) {
      return this.activeFilters.includes(category);
    },
  },
  metaInfo: {
    title: "Shops",
  },
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
h2,
h3 {
  font-weight: 400;
  margin: 0.5rem 0;
}
h3 {
  margin: 0.5rem 0 1.5rem;
}
.country {
  border-top: 1px solid var(--color-text);
  border-radius: 0;
  padding: var(--spacing-sitepadding) 0;
  margin: var(--spacing-sitepadding) 0;
  &-name {
    font-size: var(--font-size-m);
    text-transform: uppercase;
    margin: 0 0 var(--spacing-sitepadding) 0;
  }
}
.location-list {
  margin: 1rem 0 2rem;
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
}
.city-category-list,
.location-list {
  display: none;
}
.search {
  label {
    margin-right: 0.5rem;
    font-family: inherit;
    font-size: var(--font-size-s);

    @media (max-width: 600px) {
      display: block;
      margin-bottom: 0.5rem;
      margin-top: 1rem;
    }

    &:after {
      content: ":";
    }
  }
  input {
    width: 20rem;
    max-width: 100%;
  }
}
</style>
