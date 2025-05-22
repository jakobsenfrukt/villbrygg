<template>
  <section v-if="$context.locale === 'no'" class="feature-section-wrapper">
    <div class="feature-section">
      <h2 v-if="content.heading" class="feature-section__title">
        <block-content
          :blocks="content.heading._rawNo"
          v-if="content.heading._rawNo && $context.locale == 'no'"
          class="block-content body"
        />
        <block-content
          :blocks="heading._rawEn"
          v-else-if="heading._rawEn && $context.locale == 'en'"
          class="block-content body"
        />
      </h2>
      <p>{{ content.text[$context.locale] }}</p>
      <a :href="content.linkUrl[$context.locale]"><span>{{ content.linkText[$context.locale] }}</span></a>
    </div>
  </section>
</template>

<script>
import ProductItem from "@/components/products/ProductItem";
import BlockContent from "@/components/tools/BlockContent";

export default {
  components: {
    ProductItem,
    BlockContent,
  },
  props: {
    content: Object,
  }
};
</script>

<style lang="scss">
.feature-section-wrapper {
  background: var(--color-darkgreen);
  color: var(--color-white);
  border-radius: var(--border-radius-l);
}
.feature-section {
  width: 100%;
  max-width: var(--layout-max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr;
  column-gap: 0.75rem;
  padding: var(--spacing-sitepadding) var(--spacing-sitepadding)
    calc(var(--spacing-sitepadding) * 2);
  &__title {
    grid-column: 1 / -1;
    max-width: 14em;
    font-size: var(--font-size-l);
    line-height: 1.2;
    font-weight: 400;
    strong {
      font-weight: 400;
      color: rgb(0, 255, 65);
    }
    p {
      margin-bottom: 0;
    }
  }
  > p {
    font-size: var(--font-size-s);
    max-width: 20em;
  }
  a {
    text-decoration: none;
    span {
      text-decoration: underline;
      text-underline-offset: .15em;
      text-decoration-thickness: .08em;
    }
    line-height: 1.5;
    font-size: var(--font-size-l);
    text-align: right;
    margin-bottom: 1.3rem;
    &:hover {
      color: rgb(0, 255, 65);
    }
    &:after {
      content: " →";
    }
    &:before {
      content: " ";
      display: inline-block;
      background: rgb(0, 255, 65);
      width: 1.2rem;
      height: 1.2rem;
      margin-right: 1rem;
      border-radius: 1.2rem;
      vertical-align: middle;
      animation: pulse 2s ease-in-out infinite;
    }
  }
}
@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 255, 65, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 255, 65, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 255, 65, 0);
  }
}
@media (max-width: 500px) {
  .feature-section {
    grid-template-columns: 1fr;
  }
}
</style>
