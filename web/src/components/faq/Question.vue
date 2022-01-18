<template>
  <div class="faq-item" :class="{ active: active }">
    <h2 @click="toggleAnswer()" class="question" aria-role="button">
      {{ question }}
    </h2>
    <p class="answer">{{ answer }}</p>
  </div>
</template>

<script>
export default {
  props: {
    question: String,
    answer: String,
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
  cursor: pointer;
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
