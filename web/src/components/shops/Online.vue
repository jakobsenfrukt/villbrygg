<template>
  <div class="city accordion" :class="{ open: open }">
    <h3 class="list-heading city-name" role="button" @click="open = !open">
      Online
    </h3>
    <div class="city-content">
      <ul class="location-list">
        <li
          v-for="(shop, index) in shops"
          :key="`shop-${index}`"
          class="location"
        >
          <h5 class="location-name">
            <a
              v-if="shop.node.website"
              :href="shop.node.website"
              target="_blank"
              >{{ shop.node.name }}</a
            >
          </h5>
          <block-content
            :blocks="shop.node.text._rawNo"
            v-if="
              shop.node.text && shop.node.text._rawNo && $context.locale == 'no'
            "
            class="block-content"
          />
          <block-content
            :blocks="shop.node.text._rawEn"
            v-else-if="
              shop.node.text && shop.node.text._rawEn && $context.locale == 'en'
            "
            class="block-content"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BlockContent from "~/components/tools/BlockContent";

export default {
  components: {
    BlockContent,
  },
  props: {
    shops: Array,
  },
  data() {
    return {
      open: false,
    };
  },
};
</script>
