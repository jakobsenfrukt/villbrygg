<template>
  <Layout>
    <PageHeader :text="$page.shops.title[$context.locale]" />
    <main class="page-content">
      <ul class="category-list">
        <li><button class="active">Show all</button></li>
        <li
          v-for="(category, index) in $page.categories.edges"
          :key="`category-${index}`"
        >
          <button>
            {{ category.node.title[$context.locale] }}
          </button>
        </li>
      </ul>
      <div class="search">
        <label>Søk etter din by</label>
        <input type="text" />
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
            <li class="location online">
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
              <ul class="shops">
                <li
                  v-for="(shop, index) in city.node.shops"
                  :key="`shop-${index}`"
                  class="shop"
                >
                  {{ shop.name[$context.locale] }}
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
    title {
      no
      en
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

export default {
  components: {
    PageHeader,
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
.country {
  margin: 3rem 0 6rem;
  &-heading {
    text-transform: uppercase;
  }
}
.location {
  border-top: 1px solid var(--color-black);
  &:last-of-type {
    border-bottom: 1px solid var(--color-black);
  }
  &-heading {
    font-size: var(--font-size-m);
  }
}
</style>
