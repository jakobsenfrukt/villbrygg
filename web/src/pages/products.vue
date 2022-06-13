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
  metaInfo: {
    title: "Products",
  },
};
</script>
