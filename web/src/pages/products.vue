<template>
  <Layout>
    <PageHeader :content="$page.productpage.pageHeader" />
    <main class="page-content product-page">
      <ProductGrid />
      <template v-if="$context.locale == 'no'">
        <ArticleGrid
          :heading="$page.productpage.articleText"
          :items="$page.productpage.featuredArticlesNo"
          :limit="3"
        />
      </template>
      <template v-else>
        <ArticleGrid
          :heading="$page.productpage.articleText"
          :items="$page.productpage.featuredArticlesEn"
          :limit="9"
        />
      </template>
    </main>
  </Layout>
</template>

<page-query>
query {
  productpage: sanityProductpage (id: "productpage") {
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
    articleText {
      _rawNo
      _rawEn
    }
    featuredArticlesEn {
      id
      title
      slug {
        current
      }
      publishedAt
      locale
      categories {
        title {
          no
          en
        }
        color {
          hex
        }
      }
      lead
      mainImages {
        asset {
          _id
          url
        }
        alt
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
    featuredArticlesNo {
      id
      title
      slug {
        current
      }
      publishedAt
      locale
      categories {
        title {
          no
          en
        }
        color {
          hex
        }
      }
      lead
      mainImages {
        asset {
          _id
          url
        }
        alt
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
  products: allSanityProduct(
    filter: {slug: {current: {ne: null}}},
    sortBy: "title", order: DESC
  ) {
    edges {
      node {
        mainImage {
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
import ProductGrid from "~/components/products/ProductGridByCategory";
import ArticleGrid from "~/components/articles/ArticleGrid";

export default {
  components: {
    PageHeader,
    ProductGrid,
    ArticleGrid,
  },
  metaInfo() {
    return {
      title: this.$context.locale === "no" ? "Produkter" : "Products",
      meta: [
        {
          name: "description",
          content: this.$page.productpage.pageHeader.text
            ? this.$page.productpage.pageHeader.text[this.$context.locale]
            : this.$page.general.seo.description[this.$context.locale],
        },
        {
          name: "og:image",
          key: "og:image",
          content: this.$page.products.edges[0].node.mainImage
            ? this.$page.products.edges[0].node.mainImage.asset.url
            : this.$page.general.seo.ogimg.asset.url,
        },
      ],
    };
  },
};
</script>
