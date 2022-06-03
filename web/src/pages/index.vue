<template>
  <Layout class="index">
    <PageHeader :content="$page.frontpage.pageHeader" />
    <ProductGrid :heading="$page.frontpage.productText" />
    <ArticleGrid :heading="$page.frontpage.articleText" />
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
