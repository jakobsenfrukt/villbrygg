<template>
  <Layout>
    <PageHeader :content="$page.about.pageHeader" />
    <main class="page-content about-content">
      <p class="lead">
        Dette er en ingress
      </p>
      <!--<block-content
          :blocks="$page.about._rawBody"
          v-if="$page.about._rawBody"
          class="block-content"
        />-->
      <div class="body">
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32.
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
  </Layout>
</template>

<page-query>
query {
  about: sanityAbout (id: "about") {
    title {
      no
      en
    }
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
  metaInfo: {
    title: "About",
  },
};
</script>

<style lang="scss" scoped>
.about-content {
  display: grid;
  grid-template-columns: repeat(10, 1fr);

  .lead {
    grid-column: 1 / span 4;
    font-size: var(--font-size-l);
    padding-right: calc(var(--spacing-sitepadding) * 2);
  }
  .body {
    grid-column: 5 / span 6;
    padding: 0 var(--spacing-sitepadding) var(--spacing-sitepadding) 0;
  }
}

@media (max-width: 800px) {
  .about-content {
    .lead,
    .body {
      grid-column: 1 / -1;
      padding-right: 0;
    }
  }
}
</style>
