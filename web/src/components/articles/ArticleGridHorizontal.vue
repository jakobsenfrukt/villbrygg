<template>
  <div class="image-gallery">
    <vue-horizontal
      ref="horizontal"
      class="horizontal"
      :button-between="false"
      @scroll-debounce="onScrollDebounce"
    >
      <div class="item" v-for="(image, index) in items" :key="index">
        <figure>
          <g-image
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
      </div>
    </vue-horizontal>

    <div class="pagination">
      <div
        class="dot"
        :class="{ current: i - 1 === index }"
        v-for="i in pages"
        :key="i"
        @click="onPageClick(i - 1)"
      >
        <div></div>
      </div>
    </div>
  </div>
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
import VueHorizontal from "vue-horizontal";

export default {
  components: { VueHorizontal },
  props: {
    items: Array,
  },
  data() {
    return {
      width: 0,
      index: 0,
      pages: 0,
    };
  },
  methods: {
    onScrollDebounce({ scrollWidth, width, left }) {
      this.width = width;
      this.index = Math.round(left / width);
      this.pages = Math.round(scrollWidth / width);
    },
    onPageClick(i) {
      if (i === this.pages - 1) {
        // If last page, always scroll to last item
        this.$refs.horizontal.scrollToIndex(this.items.length - 1);
      } else {
        this.$refs.horizontal.scrollToLeft(i * this.width);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.image-gallery {
  margin: 2rem calc(var(--spacing-sitepadding) * -1);
}
.horizontal {
  display: flex;
  gap: 0.75rem;
}
.item {
  margin-left: 0.75rem;
  &:first-of-type {
    figure {
      margin-left: var(--spacing-sitepadding);
    }
  }
  &:last-of-type {
    figure {
      margin-right: var(--spacing-sitepadding);
    }
  }
  figure {
    margin: 0;
    width: 20rem;
  }
  img {
    border-radius: var(--border-radius);
  }
}
.content {
  background-position: center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  padding-top: 60%;
}

.pagination {
  margin-top: 12px;
  display: flex;
  justify-content: center;
}

.dot {
  padding: 4px;
  cursor: none;
}

.dot > div {
  border-radius: 10px;
  width: 10px;
  height: 10px;
  background: var(--color-lightgray);
}

.dot:hover > div {
  background: var(--color-black);
}

.dot.current > div {
  background: var(--color-black);
}
</style>

<!-- Parent CSS (Container) -->
<style scoped>
main,
article {
  padding: 24px 0;
}
</style>
