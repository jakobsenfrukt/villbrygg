<template>
  <Layout>
    <PageHeader :content="$page.contact.pageHeader" />
    <main class="page-content contact-content">
      <template v-if="$context.locale == 'no'">
        <block-content
          :blocks="$page.contact.body._rawNo"
          v-if="$page.contact.body && $page.contact.body._rawNo"
          class="block-content body"
        />
      </template>
      <template v-else-if="$context.locale == 'en'">
        <block-content
          :blocks="$page.contact.body._rawEn"
          v-if="$page.contact.body && $page.contact.body._rawEn"
          class="block-content body"
        />
      </template>
      <PersonGrid :content="$page.contact.team" />
    </main>
  </Layout>
</template>

<page-query>
query {
  contact: sanityContactpage (id: "contactpage") {
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
    team {
      name
      title {
        no
        en
      }
      email
      image {
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
import PersonGrid from "~/components/team/PersonGrid";

export default {
  components: {
    PageHeader,
    BlockContent,
    PersonGrid,
  },
  metaInfo: {
    title: "Contact",
  },
};
</script>

<style lang="scss" scoped>
.body,
p.body {
  margin-bottom: calc(var(--spacing-sitepadding) * 2);
}
</style>
