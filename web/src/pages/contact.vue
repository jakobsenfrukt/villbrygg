<template>
  <Layout>
    <PageHeader :content="$page.contact.pageHeader" />
    <main class="page-content contact-content">
      <ul class="team">
        <Person
          v-for="(person, index) in $page.contact.team"
          :key="index"
          :person="person"
        />
      </ul>
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
import Person from "~/components/Person";

export default {
  components: {
    PageHeader,
    BlockContent,
    Person,
  },
  metaInfo: {
    title: "Contact",
  },
};
</script>

<style lang="scss" scoped>
.contact-content {
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

.team {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-column: 1 / -1;
  gap: var(--spacing-sitepadding);

  list-style: none;
  margin: 0;
  padding: 0;
}

@media (max-width: 800px) {
  .contact-content {
    .lead,
    .body {
      grid-column: 1 / -1;
      padding-right: 0;
    }
  }
}
</style>
