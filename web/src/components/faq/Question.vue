<template>
  <div class="faq-item" :class="{ active: active }">
    <h2 @click="toggleAnswer()" class="question" aria-role="button">
      {{ question }}
    </h2>
    <div class="answer">
      <template v-if="$context.locale == 'no'">
        <block-content
          :blocks="answer._rawNo"
          v-if="answer._rawNo"
          class="block-content body"
        />
      </template>
      <template v-else-if="$context.locale == 'en'">
        <block-content
          :blocks="answer._rawEn"
          v-if="answer._rawEn"
          class="block-content body"
        />
      </template>
    </div>
  </div>
</template>

<script>
import BlockContent from "@/components/tools/BlockContent";

export default {
  components: {
    BlockContent,
  },
  props: {
    question: String,
    answer: Object,
  },
  data() {
    return {
      active: false,
    };
  },
  methods: {
    toggleAnswer() {
      this.active = !this.active;
    },
  },
};
</script>

<style lang="scss" scoped>
.question {
  position: relative;
  font-size: var(--font-size-l);
  font-weight: 400;
  margin: 1.5rem 0;
  cursor: none;
  &:after {
    content: "→";
    position: absolute;
    top: 0;
    right: 0;
    font-size: var(--font-size-l);
    font-weight: 400;
    transform: rotate(0deg);
    transition: transform 0.3s ease;
  }
}
.answer {
  display: none;
}
.active {
  .question {
    &:after {
      transform: rotate(-90deg);
    }
  }
  .answer {
    display: block;
  }
}
</style>
