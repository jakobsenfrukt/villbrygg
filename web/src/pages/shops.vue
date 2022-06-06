<template>
  <Layout>
    <PageHeader :content="$page.shops.pageHeader" />
    <main class="page-content">
      <ul class="category-list">
        <li>
          <button
            :class="currentCategory === 'all' ? 'active' : ''"
            @click="changeFilter('all')"
          >
            Show all
          </button>
        </li>
        <li
          v-for="(category, index) in $page.categories.edges"
          :key="`category-${index}`"
        >
          <button @click="changeFilter(category.node.title.en)">
            {{ category.node.title[$context.locale] }}
          </button>
        </li>
      </ul>
      <div class="search">
        <label>{{ $t("navigation.shopSearchLabel") }}</label>
        <input
          type="text"
          :placeholder="$t('navigation.shopSearchPlaceholder')"
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
              class="online accordion"
              v-if="getOnlineShopsByCountry(country).length"
            >
              <h3 class="list-heading online">Online</h3>
              <ul class="location-list">
                <li
                  v-for="(onlineShop, index) in getOnlineShopsByCountry(
                    country
                  )"
                  :key="`onlineShop-${index}`"
                  class="location"
                >
                  <h5 class="location-name">
                    {{ onlineShop.node.name }}
                  </h5>
                  <p>
                    The standard chunk of Lorem Ipsum used since the 1500s is
                    reproduced below for those interested.
                  </p>
                  <a
                    v-if="onlineShop.node.website"
                    :href="onlineShop.node.website"
                    >{{ onlineShop.node.website }}</a
                  >
                </li>
              </ul>
            </li>
            <li
              v-for="(city, index) in $page.cities.edges"
              :key="`city-${index}`"
              class="city accordion"
            >
              <div class="city-wrapper" v-if="getLocationsByCity(city).length">
                <h3 class="list-heading city-name">
                  {{ city.node.name[$context.locale] }}
                </h3>
                <ul
                  class="category-list"
                  v-if="getLocationsByCity(city).length"
                >
                  <li
                    v-for="(category, index) in $page.categories.edges"
                    :key="`category-${index}`"
                    class="locations-category"
                  >
                    <div
                      class="category-wrapper"
                      v-if="getLocationsByCategory(city, category).length"
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
                          <p>
                            The standard chunk of Lorem Ipsum used since the
                            1500s is reproduced below for those interested.
                          </p>
                          <a
                            v-if="location.node.website"
                            :href="location.node.website"
                            >{{ location.node.website }}</a
                          >
                          <!--<block-content
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
                      />-->
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
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
import BlockContent from "~/components/tools/BlockContent";

export default {
  components: {
    PageHeader,
    BlockContent,
  },
  data() {
    return {
      currentCategory: "all",
    };
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
  margin: 3rem 0 6rem;
  &-heading {
    font-size: var(--font-size-l);
    text-transform: uppercase;
  }
}
.accordion {
  border-top: 1px solid var(--color-lightgray);
  position: relative;
  &:after {
    content: "+";
    position: absolute;
    top: 0;
    right: 0;
    font-size: var(--font-size-l);
    font-weight: 400;
    transform: rotate(0deg);
    transition: transform 0.3s ease;
  }
  &:last-of-type {
    border-bottom: 1px solid var(--color-lightgray);
  }
  .list-heading {
    font-size: var(--font-size-l);
    margin: 1.5rem 0;
    &.online,
    &.category-name {
      font-size: var(--font-size-s);
      color: var(--color-green);
    }
  }
}
.location-list {
  margin: 0 0 2rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
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
  }
}
.search {
  label {
    margin-right: 0.5rem;
    &:after {
      content: ":";
    }
  }
  input {
    width: 20rem;
  }
}
</style>
