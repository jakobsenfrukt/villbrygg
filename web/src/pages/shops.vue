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
        <label>Søk etter din by</label>
        <input type="text" placeholder="Søk på by, navn, etc" />
      </div>
      <ul class="countries">
        <li
          v-for="(country, index) in $page.countries.edges"
          :key="`country-${index}`"
          class="country"
        >
          <h2 class="country-heading">
            {{ country.node.name[$context.locale] }}
          </h2>

          <ul class="location-list">
            <li class="location online" v-if="country.node.online.length">
              <h3 class="location-heading">Online</h3>
              <ul class="shops">
                <li
                  v-for="(online, index) in country.node.online"
                  :key="`online-${index}`"
                  class="shop"
                >
                  {{ online.name[$context.locale] }}
                </li>
              </ul>
            </li>
            <li
              v-for="(city, index) in $page.cities.edges"
              :key="`city-${index}`"
              class="location city"
            >
              <h3 class="location-heading">
                {{ city.node.name[$context.locale] }}
              </h3>
              <ul class="shop-list" v-if="city.node.shops.length">
                <li
                  v-for="(shop, index) in city.node.shops"
                  :key="`shop-${index}`"
                  class="shop"
                >
                  <h4 class="shop-name">{{ shop.name[$context.locale] }}</h4>
                  <block-content
                    :blocks="shop.text._rawNo"
                    v-if="shop.text._rawNo && $context.locale == 'no'"
                    class="block-content"
                  />
                  <block-content
                    :blocks="shop.text._rawEn"
                    v-else-if="shop.text._rawEn && $context.locale == 'en'"
                    class="block-content"
                  />
                </li>

                <li
                  v-for="(shop, index) in city.node.shops"
                  :key="`shop-${index}`"
                  class="shop"
                >
                  <h4 class="shop-name">{{ shop.name[$context.locale] }}</h4>
                  <block-content
                    :blocks="shop.text._rawNo"
                    v-if="shop.text._rawNo && $context.locale == 'no'"
                    class="block-content"
                  />
                  <block-content
                    :blocks="shop.text._rawEn"
                    v-else-if="shop.text._rawEn && $context.locale == 'en'"
                    class="block-content"
                  />
                </li>
                <li
                  v-for="(shop, index) in city.node.shops"
                  :key="`shop-${index}`"
                  class="shop"
                >
                  <h4 class="shop-name">{{ shop.name[$context.locale] }}</h4>
                  <block-content
                    :blocks="shop.text._rawNo"
                    v-if="shop.text._rawNo && $context.locale == 'no'"
                    class="block-content"
                  />
                  <block-content
                    :blocks="shop.text._rawEn"
                    v-else-if="shop.text._rawEn && $context.locale == 'en'"
                    class="block-content"
                  />
                </li>
                <li
                  v-for="(shop, index) in city.node.shops"
                  :key="`shop-${index}`"
                  class="shop"
                >
                  <h4 class="shop-name">{{ shop.name[$context.locale] }}</h4>
                  <block-content
                    :blocks="shop.text._rawNo"
                    v-if="shop.text._rawNo && $context.locale == 'no'"
                    class="block-content"
                  />
                  <block-content
                    :blocks="shop.text._rawEn"
                    v-else-if="shop.text._rawEn && $context.locale == 'en'"
                    class="block-content"
                  />
                </li>
                <li
                  v-for="(shop, index) in city.node.shops"
                  :key="`shop-${index}`"
                  class="shop"
                >
                  <h4 class="shop-name">{{ shop.name[$context.locale] }}</h4>
                  <block-content
                    :blocks="shop.text._rawNo"
                    v-if="shop.text._rawNo && $context.locale == 'no'"
                    class="block-content"
                  />
                  <block-content
                    :blocks="shop.text._rawEn"
                    v-else-if="shop.text._rawEn && $context.locale == 'en'"
                    class="block-content"
                  />
                </li>
                <li
                  v-for="(shop, index) in city.node.shops"
                  :key="`shop-${index}`"
                  class="shop"
                >
                  <h4 class="shop-name">{{ shop.name[$context.locale] }}</h4>
                  <block-content
                    :blocks="shop.text._rawNo"
                    v-if="shop.text._rawNo && $context.locale == 'no'"
                    class="block-content"
                  />
                  <block-content
                    :blocks="shop.text._rawEn"
                    v-else-if="shop.text._rawEn && $context.locale == 'en'"
                    class="block-content"
                  />
                </li>
              </ul>
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
  countries: allSanityShopsCountry(sortBy: "name", order: ASC) {
    edges {
      node {
        name {
          no
          en
        }
        online {
          name {
            no
            en
          }
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
        shops {
          category {
            title {
              no
              en
            }
          }
          name {
            no
            en
          }
          text {
            _rawNo
            _rawEn
          }
        }
      }
    }
  }
  categories: allSanityShopsCategory(sortBy: "name", order: ASC) {
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
.location {
  border-top: 1px solid var(--color-lightgray);
  &:last-of-type {
    border-bottom: 1px solid var(--color-lightgray);
  }
  &-heading {
    font-size: var(--font-size-l);
    margin: 1.5rem 0;
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
  }
}
.shop-list {
  margin: 2rem 10%;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 2rem;
}
.shop {
  grid-column: span 2;
  &-name {
    font-size: var(--font-size-m);
    margin-bottom: 0.5rem;
  }
}
</style>
