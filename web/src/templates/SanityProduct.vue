<template>
  <Layout>
    <header class="product-header">
      <h1 class="product-title">{{ $page.product.title }}</h1>
      <img
        v-if="$page.product.mainImage"
        :alt="$page.product.mainImage.alt[$context.locale]"
        :src="
          $urlForImage($page.product.mainImage, $page.metadata.sanityOptions)
            .width(600)
            .auto('format')
            .url()
        "
      />
      <p class="lead product-lead">
        {{ $page.product.lead[$context.locale] }}
      </p>
    </header>

    <main class="page-content product-content">
      <block-content
        :blocks="$page.product.body._rawNo"
        v-if="$page.product.body._rawNo && $context.locale == 'no'"
        class="block-content"
      />
      <block-content
        :blocks="$page.product.body._rawEn"
        v-else-if="$page.product.body._rawEn && $context.locale == 'en'"
        class="block-content"
      />
    </main>
  </Layout>
</template>

<page-query>
query product ($id: ID!) {
  metadata {
    sanityOptions {
      projectId
      dataset
    }
  }
  product: sanityProduct (id: $id) {
    title
    lead {
      no
      en
    }
    body {
      _rawNo
      _rawEn
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
}
</page-query>

<script>
import BlockContent from "~/components/tools/BlockContent";

export default {
  components: {
    BlockContent,
  },
  metaInfo() {
    return {
      title: this.$page.product.title,
      meta: [
        {
          name: "description",
          content: this.$page.product.description,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.product-header {
  width: 100%;
  background: var(--color-background);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  padding: var(--spacing-sitepadding);
  padding-bottom: 2rem;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: calc(var(--spacing-sitepadding) / 2);

  .text {
    min-height: 16rem;
    grid-column: 5 / span 6;
    display: flex;
    align-items: flex-end;
    padding-bottom: 2rem;
  }
  .heading {
    font-weight: inherit;
    font-size: var(--font-size-xl);
    line-height: 1.2;
    max-width: 14em;
  }
  img {
    grid-column: span 6;
    border-radius: var(--border-radius);
    width: 100%;
    max-height: 86vh;
    object-fit: cover;
    &.single {
      grid-column: span 10;
    }
  }
  img:nth-of-type(even) {
    grid-column: span 4;
  }
}
</style>
