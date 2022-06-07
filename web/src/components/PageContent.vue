<template>
  <section class="content-blocks">
    <div
      v-for="(block, index) in content"
      :key="index"
      class="content-block"
      :class="block._type"
    >
      <!-- Text blocks -->
      <template v-if="block._type === 'bodyBlock'">
        <block-content
          :blocks="block._rawBody"
          v-if="block._rawBody"
          class="block-content"
        />
      </template>

      <!-- Text block -->
      <template v-if="block._type === 'textBlock'">
        <p>{{ block.text }}</p>
      </template>

      <!-- Figure blocks -->
      <template v-if="block._type === 'figure'">
        <figure>
          <img
            :src="
              $urlForImage(block, $static.metadata.sanityOptions)
                .width(800)
                .auto('format')
                .url()
            "
            :alt="block.alt"
          />
          <figcaption v-if="block.caption && block.caption">
            {{ block.caption }}
          </figcaption>
        </figure>
      </template>

      <!-- Text + image blocks -->
      <template v-if="block._type === 'imageAndText'">
        <p>
          {{ block.text }}
        </p>
        <figure>
          <img
            v-if="block.image"
            :src="
              $urlForImage(block.image, $static.metadata.sanityOptions)
                .width(800)
                .auto('format')
                .url()
            "
            :alt="block.image.alt"
          />
          <figcaption v-if="block.image.caption && block.image.caption">
            {{ block.image.caption }}
          </figcaption>
        </figure>
      </template>

      <!-- Image column blocks -->
      <template v-if="block._type === 'figureTwoColumn'">
        <figure
          v-for="(image, index) in block.images"
          :key="index"
          class="image"
        >
          <img
            v-if="image"
            :src="
              $urlForImage(image, $static.metadata.sanityOptions)
                .width(600)
                .auto('format')
                .url()
            "
            :alt="image.alt"
          />
          <figcaption v-if="image.caption && image.caption">
            {{ image.caption }}
          </figcaption>
        </figure>
      </template>

      <!-- Image gallery blocks -->
      <template v-if="block._type === 'imageGallery'">
        <figure
          v-for="(image, index) in block.images"
          :key="index"
          class="image"
        >
          <img
            v-if="image"
            :src="
              $urlForImage(image, $static.metadata.sanityOptions)
                .width(600)
                .auto('format')
                .url()
            "
            :alt="image.alt"
          />
          <figcaption v-if="image.caption && image.caption">
            {{ image.caption }}
          </figcaption>
        </figure>
      </template>
    </div>
  </section>
</template>

<static-query>
query {
  metadata {
    sanityOptions {
      projectId
      dataset
    }
  }
}
</static-query>

<script>
import BlockContent from "@/components/tools/BlockContent";

export default {
  components: {
    BlockContent,
  },
  props: {
    content: Array,
  },
};
</script>

<style lang="scss" scoped>
.content-blocks {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  figure {
    margin: 0;
  }
  img {
    display: block;
    width: 100%;
    border-radius: var(--border-radius);
  }
}
.content-block {
  grid-column: 1 / -1;
}
.textBlock {
  font-size: var(--font-size-l);
}
.bodyBlock {
  grid-column: 5 / span 6;
}
.imageAndText {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  align-items: flex-start;
  margin: var(--spacing-sitepadding) auto;

  p {
    grid-column: 1 / span 4;
    font-size: var(--font-size-l);
    padding-right: 2rem;
  }
  figure {
    grid-column: 5 / span 6;
  }
}
.figureTwoColumn {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: flex-start;
  gap: 0.75rem;
  margin: var(--spacing-sitepadding) auto;
}

.imageGallery {
  display: flex;
  gap: 0.75rem;
  margin: var(--spacing-sitepadding) auto;
  margin: 0 calc(var(--spacing-sitepadding) * -2);
  padding: calc(var(--spacing-sitepadding) * 1.5)
    calc(var(--spacing-sitepadding) * 2);

  img {
    width: 100%;
  }
}
</style>
