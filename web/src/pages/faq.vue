<template>
  <Layout>
    <PageHeader :content="$page.faq.pageHeader" />
    <main class="page-content">
      <ul class="category-list">
        <li
          v-for="(category, index) in $page.categories.edges"
          :key="`category-${index}`"
        >
          <button
            :class="currentCategory === category.node.title.en ? 'active' : ''"
            @click="switchCategory(category.node.title.en)"
          >
            {{ category.node.title[$context.locale] }}
          </button>
        </li>
      </ul>
      <ul class="questions" key="questions">
        <li
          v-for="question in sortedCategories()"
          :key="question.node.id"
          class="question"
        >
          <Question
            :question="question.node.question[$context.locale]"
            :answer="question.node.answer"
            :key="question.node.id"
          />
        </li>
      </ul>
    </main>
  </Layout>
</template>

<page-query>
query {
  faq: sanityFaq (id: "faq") {
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
  questions: allSanityFaqQuestion(sortBy: "question.en", order: DESC) {
    edges {
      node {
        id
        category {
          title {
            no
            en
          }
        }
        question {
          no
          en
        }
        answer {
          _rawNo
          _rawEn
        }
      }
    }
  }
  categories: allSanityFaqCategory(sortBy: "title", order: ASC) {
    edges {
      node {
        title {
          no
          en
        }
      }
    }
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
import Question from "~/components/faq/Question";

export default {
  components: {
    PageHeader,
    BlockContent,
    Question,
  },
  data() {
    return {
      currentCategory: undefined,
    };
  },
  methods: {
    switchCategory(category) {
      this.currentCategory = category;
    },
    sortedCategories() {
      const questions = this.$page.questions.edges;
      return questions.filter(
        (question) => question.node.category.title.en === this.currentCategory
      );
    },
  },
  mounted() {
    this.switchCategory(this.$page.categories.edges[0].node.title.en);
  },
  metaInfo() {
    return {
      title: "FAQ",
      meta: [
        {
          name: "description",
          content: this.$page.faq.pageHeader.text
            ? this.$page.faq.pageHeader.text[this.$context.locale]
            : this.$page.general.seo.description[this.$context.locale],
        },
        {
          name: "og:image",
          key: "og:image",
          content: this.$page.faq.pageHeader.images.length
            ? this.$page.faq.pageHeader.images[0].asset.url
            : this.$page.general.seo.ogimg.asset.url,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.questions {
  list-style: none;
  margin: 0 0 calc(var(--spacing-sitepadding) * 2);
  padding: 0;
}
.question {
  border-top: 1px solid var(--color-lightgray);
  &:last-of-type {
    border-bottom: 1px solid var(--color-lightgray);
  }
}
</style>
