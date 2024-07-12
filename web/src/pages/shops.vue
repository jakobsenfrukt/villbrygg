<template>
  <Layout>
    <header class="page-header-wrapper">
      <div class="page-header">
        <div class="text">
          <h1 class="heading" v-if="$page.shops.pageHeader.heading">
            {{ $page.shops.pageHeader.heading[$context.locale] }}
            <span v-if="$page.shops.pageHeader.subheading" class="subheading">{{
              $page.shops.pageHeader.subheading[$context.locale]
            }}</span>
          </h1>
          <p class="lead" v-if="$page.shops.pageHeader.text">
            {{ $page.shops.pageHeader.text[$context.locale] }}
          </p>
          <template v-if="$context.locale == 'no' && $page.shops.body">
            <block-content
              :blocks="$page.shops.body._rawNo"
              v-if="$page.shops.body._rawNo"
              class="block-content body"
            />
          </template>
          <template v-else-if="$context.locale == 'en' && $page.shops.body">
            <block-content
              :blocks="$page.shops.body._rawEn"
              v-if="$page.shops.body._rawEn"
              class="block-content body"
            />
          </template>
        </div>
        <template v-if="$page.shops.pageHeader.images">
          <g-image
            v-for="(image, index) in $page.shops.pageHeader.images"
            :key="`image-${index}`"
            :class="$page.shops.pageHeader.images.length === 1 ? 'single' : ''"
            :src="
              $urlForImage(image, $static.metadata.sanityOptions)
                .width(1440)
                .auto('format')
                .url()
            "
            :alt="image.alt[$context.locale] ? image.alt[$context.locale] : ''"
          />
        </template>
      </div>
    </header>
    <main class="page-content-wrapper">
      <div class="page-content">
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
            <h2
              class="list-heading country-name"
              v-if="
                visibleCitiesByCountry(country).length ||
                  (getOnlineShopsByCountry(country).length &&
                    (showAll || checkActiveFilter('Online')))
              "
            >
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
              <li
                v-for="(city, index) in visibleCitiesByCountry(country)"
                :key="`city-${index}`"
              >
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
      </div>
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
    body {
      _rawNo
      _rawEn
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
  countries: allSanityShopsCountry(sortBy: "name.en", order: ASC) {
    edges {
      node {
        name {
          no
          en
        }
      }
    }
  }
  cities: allSanityShopsCity(sortBy: "name.en", order: ASC) {
    edges {
      node {
        name {
          no
          en
        }
        country {
          name {
            no
            en
          }
        }
      }
    }
  }
  categories: allSanityShopsCategory(sortBy: "title.en", order: ASC) {
    edges {
      node {
        id
        title {
          no
          en
        }
      }
    }
  }
  general: sanityGeneral(id: "general") {
    seo {
      ogimg {
        asset {
          url
        }
      }
      description
    }
  }
}
</page-query>

<script>
import PageHeader from "~/components/PageHeader";
import BlockContent from "~/components/tools/BlockContent";
import City from "~/components/shops/City";
import Online from "~/components/shops/Online";

export default {
  components: {
    PageHeader,
    BlockContent,
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
        const query = this.searchQuery.toLowerCase();
        cities = cities.filter(
          (item) =>
            item.node.name.en.toLowerCase().includes(query) ||
            item.node.name.no.toLowerCase().includes(query)
        );
      }
      // check each city if it contains locations matching the current filters
      cities = cities.filter((city) => this.cityHasContent(city));
      return cities;
    },
    sortedCategories() {
      const categories = this.$page.categories.edges;

      const sortedEnCategories = categories
        .slice()
        .sort((a, b) => a.node.title.en.localeCompare(b.node.title.en));

      const otherEn = sortedEnCategories.find(
        (item) => item.node.id === "972cf078-ce7f-49f4-9912-73520054a96c"
      );
      const indexEn = sortedEnCategories.indexOf(otherEn);
      const newOtherEn = sortedEnCategories.splice(indexEn, 1);

      const sortedNoCategories = categories.slice().sort((a, b) => {
        if (a.node.id === "972cf078-ce7f-49f4-9912-73520054a96c") {
          return 1;
        }
        if (b.node.id === "972cf078-ce7f-49f4-9912-73520054a96c") {
          return -1;
        }
        return a.node.title.no.localeCompare(b.node.title.no);
      });

      const sortedCategories = {
        en: sortedEnCategories,
        no: sortedNoCategories,
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
    visibleCitiesByCountry(country) {
      return this.visibleCities.filter(
        (item) => item.node.country.name.en === country.node.name.en
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
    cityHasContent(city) {
      const cityHasLocations = this.getLocationsByCity(city).length
      if (!cityHasLocations) {
        return false
      }
      // check if city contains any category matching current filters
      const categories = this.getLocationsByCity(city).map(
        (item) => item.node.category.title.en
      );
      return this.activeFilters.some((activeFilter) =>
        categories.includes(activeFilter)
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
  metaInfo() {
    return {
      title: this.$context.locale === "no" ? "Butikker" : "Shops",
      meta: [
        {
          name: "description",
          content: this.$page.shops.pageHeader.text
            ? this.$page.shops.pageHeader.text[this.$context.locale]
            : this.$page.general.seo.description[this.$context.locale],
        },
        {
          name: "og:image",
          key: "og:image",
          content: this.$page.shops.pageHeader.images.length
            ? this.$page.shops.pageHeader.images[0].asset.url
            : this.$page.general.seo.ogimg.asset.url,
        },
      ],
    };
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
  border-radius: 0;
  padding: 0 0 var(--spacing-sitepadding) 0;
  margin: var(--spacing-sitepadding) 0;
  &-name {
    border-top: 1px solid var(--color-text);
    padding: var(--spacing-sitepadding) 0 0;
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

.page-header-wrapper {
  background: var(--color-background);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.page-header {
  width: 100%;
  max-width: var(--layout-max-width);
  margin: 0 auto;
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
.index .page-header-wrapper {
  border-bottom-left-radius: var(--border-radius-l);
  border-bottom-right-radius: var(--border-radius-l);
}

@media (max-width: 1110px) {
  .page-header {
    .text {
      grid-column: 1 / -1;
      min-height: 0;
      padding-top: var(--spacing-sitepadding);
    }
    p {
      width: 100%;
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
