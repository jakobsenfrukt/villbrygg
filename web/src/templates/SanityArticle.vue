<template>
  <Layout>
    <div class="article">
      <header class="article-header">
        <div class="text">
          <h1 class="heading">{{ $page.article.title }}</h1>
        </div>
        <template v-if="$page.article.mainImages">
          <g-image
            v-for="(image, index) in $page.article.mainImages"
            :key="`image-${index}`"
            :class="$page.article.mainImages.length === 1 ? 'single' : ''"
            :src="
              $urlForImage(image, $page.metadata.sanityOptions)
                .width(1440)
                .auto('format')
                .url()
            "
            :alt="image.alt[$context.locale]"
          />
        </template>
      </header>

      <main class="page-content article-content">
        <p class="lead">
          {{ $page.article.lead }}
        </p>
        <!--<block-content
          :blocks="$page.article._rawBody"
          v-if="$page.article._rawBody"
          class="block-content"
        />-->
        <div class="body">
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
            amet..", comes from a line in section 1.10.32.
          </p>
          <p>
            The standard chunk of Lorem Ipsum used since the 1500s is reproduced
            below for those interested. Sections 1.10.32 and 1.10.33 from "de
            Finibus Bonorum et Malorum" by Cicero are also reproduced in their
            exact original form, accompanied by English versions from the 1914
            translation by H. Rackham.
          </p>
        </div>
      </main>
    </div>
  </Layout>
</template>

<page-query>
query article ($id: ID!) {
  metadata {
    sanityOptions {
      projectId
      dataset
    }
  }
  article: sanityArticle (id: $id) {
    title
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
</page-query>

<script>
import BlockContent from "~/components/tools/BlockContent";

export default {
  components: {
    BlockContent,
  },
  metaInfo() {
    return {
      title: this.$page.article.title,
      meta: [
        {
          name: "description",
          content: this.$page.article.description,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.article-header {
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
.article-content {
  display: grid;
  grid-template-columns: repeat(10, 1fr);

  .lead {
    grid-column: 1 / span 4;
    font-size: var(--font-size-m);
    padding-right: calc(var(--spacing-sitepadding) * 2);
  }
  .body {
    grid-column: 5 / span 6;
    padding: 0 var(--spacing-sitepadding) var(--spacing-sitepadding) 0;
  }
}

@media (max-width: 800px) {
  .article-header {
    .text {
      grid-column: 1 / -1;
    }
    /*img {
      grid-column: span 9;
      max-height: 40vh;
    }
    img:nth-of-type(even) {
      grid-column: 4 / span 7;
    }*/
  }
  .article-content {
    .lead,
    .body {
      grid-column: 1 / -1;
    }
  }
}
</style>
