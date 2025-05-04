<template>
  <section class="feature-section-wrapper">
    <div class="feature-section">
      <h2 class="feature-section__title">
        <p>
          Villbrygg er i sterk vekst, <strong>dette er din mulighet til å bli med som medeier!</strong>
        </p>
      </h2>
      <p>Invester i en fremtid der kvalitet, bærekraft og innovasjon går hånd i hånd.</p>
      <a><span>Bli medeier</span></a>
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
    items: {
      type: Array,
      default: undefined,
    },
    limit: {
      type: Number,
      default: 12,
    },
    heading: Object,
  },
  methods: {
    shuffle(array) {
      return array
        .filter((item) => item.node.id != this.current)
        .sort(() => Math.random() - Math.random());
    },
  },
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
    color: rgb(0, 255, 65);
    strong {
      font-weight: 400;
      color: var(--color-white);
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
