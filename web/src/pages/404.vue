<template>
  <Layout>
    <PageHeader :content="pageHeader" />
    <main class="page-content">
      <p>
        {{ message[$context.locale] }}
      </p>
      <p>
        &rarr; <a href="/">{{ link[$context.locale] }}</a>
      </p>
    </main>
  </Layout>
</template>

<script>
import PageHeader from "~/components/PageHeader";

export default {
  components: {
    PageHeader,
  },
  data() {
    return {
      pageHeader: {
        heading: {
          no: "404",
          en: "404",
        },
        subheading: {
          no: "Finner ikke siden",
          en: "Missing page",
        },
      },
      message: {
        no:
          "Av en eller annen grunn finner vi ikke siden du ser etter. Har du sjekket at du skrev URLen riktig? Hvis du er helt sikker på at det skulle vært en side her, gi oss gjerne beskjed. Hvis ikke, prøv igjen fra forsiden vår.",
        en:
          "For some reason we can't find the page you're looking for. Did you check the spelling in the URL? If you know for sure there was supposed to be a page here, please let us know. If not, try again from our front page.",
      },
      link: {
        no: "Hjem",
        en: "Home",
      },
    };
  },
  metaInfo: {
    title: "404",
  },
};
</script>
