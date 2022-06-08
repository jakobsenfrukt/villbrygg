<template>
  <Layout class="index">
    <PageHeader :content="$page.frontpage.pageHeader" />
    <ProductGrid
      :heading="$page.frontpage.productText"
      :items="$page.frontpage.featuredProducts"
      :limit="4"
    />
    <template v-if="$context.locale == 'no'">
      <ArticleGrid
        :heading="$page.frontpage.articleText"
        :items="$page.frontpage.featuredArticlesNo"
        :limit="3"
      />
    </template>
    <template v-else>
      <ArticleGrid
        :heading="$page.frontpage.articleText"
        :items="$page.frontpage.featuredArticlesEn"
        :limit="9"
      />
    </template>
  </Layout>
</template>

<page-query>
query {
  frontpage: sanityFrontpage (id: "frontpage") {
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
    productText {
      _rawNo
      _rawEn
    }
    articleText {
      _rawNo
      _rawEn
    }
    featuredProducts {
      id
      title
      slug {
        current
      }
      lead {
        no
        en
      }
      category {
        title {
          no
          en
        }
        color {
          hex
        }
      }
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
import ProductGrid from "~/components/products/ProductGrid";
import ArticleGrid from "~/components/articles/ArticleGrid";

export default {
  components: {
    PageHeader,
    ProductGrid,
    ArticleGrid,
  },
  metaInfo: {
    title: "Welcome",
  },
};
</script>
