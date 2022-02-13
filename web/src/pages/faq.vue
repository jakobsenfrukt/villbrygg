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
      <ul class="questions">
        <li
          v-for="(question, index) in sortedCategories()"
          :key="`question-${index}`"
          class="question"
        >
          <Question
            :question="question.node.question[$context.locale]"
            :answer="question.node.answer[$context.locale]"
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
  questions: allSanityFaqQuestion(sortBy: "category", order: ASC) {
    edges {
      node {
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
          no
          en
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
  metaInfo: {
    title: "FAQ",
  },
};
</script>

<style lang="scss" scoped>
.questions {
  list-style: none;
  margin: 0 0 calc(var(--spacing-sitepadding) * 2);
  padding: 0;

  h2 {
    font-size: var(--font-size-xl);
    font-weight: 400;
    margin: 0.5rem 0 2rem;
  }
}
.question {
  border-top: 1px solid var(--color-lightgray);
  &:last-of-type {
    border-bottom: 1px solid var(--color-lightgray);
  }
}
</style>
