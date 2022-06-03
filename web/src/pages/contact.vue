<template>
  <Layout>
    <PageHeader :content="$page.contact.pageHeader" />
    <main class="page-content contact-content">
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
