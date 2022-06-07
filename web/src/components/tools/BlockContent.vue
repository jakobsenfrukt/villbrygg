<template>
  <portable-text
    :blocks="blocks"
    :serializers="serializers"
    :projectId="$static.metadata.sanityOptions.projectId"
    :dataset="$static.metadata.sanityOptions.dataset"
  />
</template>

<script>
import PortableText from "sanity-blocks-vue-component";

export default {
  props: {
    blocks: Array,
  },
  components: {
    PortableText,
  },
  data() {
    return {
      serializers: {
        types: {
          figure: ({ node }) => (
            <figure>
              <img
                src={this.$urlForImage(
                  node,
                  this.$static.metadata.sanityOptions
                )
                  .auto("format")
                  .url()}
                alt={node.alt}
              />
              <figcaption>{node.caption}</figcaption>
            </figure>
          ),
        },
      },
    };
  },
};
</script>

<static-query>
  {
    metadata{
    sanityOptions{
      projectId
      dataset
    }
  }
}
</static-query>

<style lang="scss">
.block-content {
  figure {
    margin: 2rem 0 2rem 0;

    img {
      width: 100%;
      border-radius: var(--border-radius);
    }
  }
  blockquote {
    margin: 2.5rem 0 2.8rem;
    padding: 0 20% 0 0;
    font-weight: 400;
    font-size: var(--font-size-m);
  }
}
figcaption {
  font-size: var(--font-size-xs);
  margin: 0.5rem 0 1rem;
}
</style>
