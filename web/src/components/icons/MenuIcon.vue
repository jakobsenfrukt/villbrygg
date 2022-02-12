<template>
  <svg class="menuicon" viewBox="0 0 62 58" xmlns="http://www.w3.org/2000/svg">
    <g class="close" v-if="open">
      <path d="M59.7339 52.077L7.92297 0.266113L2.26612 5.92297L54.077 57.7339L59.7339 52.077Z" />
      <path d="M7.92296 57.7339L59.7339 5.92297L54.077 0.266119L2.2661 52.077L7.92296 57.7339Z" />
    </g>
    <g class="open" v-else>
      <path d="M62 0H0V8H62V0Z" />
      <path d="M62 25H0V33H62V25Z" />
      <path d="M62 50H0V58H62V50Z" />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.menuicon {
  width: 100%;
  fill: currentColor;
}
</style>