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
      <div class="general">
        <p class="general-heading">
          {{ $page.contact.generalHeading[$context.locale] }}
        </p>
        <p class="general-links">
          <span class="general-label">{{
            $page.contact.generalLabel[$context.locale]
          }}</span>
          <a :href="`mailto:${$page.contact.email}`" target="_blank">{{
            $page.contact.email
          }}</a>
          <a :href="`tel:${$page.contact.phone}`" target="_blank">{{
            $page.contact.phone
          }}</a>
        </p>
      </div>
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
    generalHeading {
      no
      en
    }
    generalLabel {
      no
      en
    }
    email
    phone
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
import BlockContent from "~/components/tools/BlockContent";
import PersonGrid from "~/components/team/PersonGrid";

export default {
  components: {
    PageHeader,
    BlockContent,
    PersonGrid,
  },
  metaInfo() {
    return {
      title: this.$context.locale === "no" ? "Kontakt" : "Contact",
      meta: [
        {
          name: "description",
          content: this.$page.contact.pageHeader.text
            ? this.$page.contact.pageHeader.text[this.$context.locale]
            : this.$page.general.seo.description[this.$context.locale],
        },
        {
          name: "og:image",
          key: "og:image",
          content: this.$page.contact.pageHeader.images.length
            ? this.$page.contact.pageHeader.images[0].asset.url
            : this.$page.general.seo.ogimg.asset.url,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.body,
p.body {
  margin-bottom: calc(var(--spacing-sitepadding) * 2);
}
.general {
  padding: calc(var(--spacing-sitepadding) * 3) 0;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  &-heading {
    font-size: var(--font-size-l);
    grid-column: 1 / span 6;
    margin-bottom: calc(var(--spacing-sitepadding) * 2);
  }
  &-links {
    grid-column: 1 / span 6;
    font-size: var(--font-size-m);
    span,
    a {
      display: block;
    }
  }
}
@media (max-width: 800px) {
  .general {
    &-heading {
      grid-column: 1 / -1;
    }
    &-links {
      grid-column: 1 / -1;
    }
  }
}
</style>
