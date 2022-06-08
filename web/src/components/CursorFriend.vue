<template>
  <div class="cursorfriend" :style="`--cursor-color: ${color}`"></div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "lime",
    },
  },
  data() {
    return {
      isInView: false,
    };
  },
  methods: {
    moveCursor(e) {
      const cursorFriend = document.querySelector(".cursorfriend");
      const mouseY = e.clientY;
      const mouseX = e.clientX;

      cursorFriend.style.display = `block`;
      cursorFriend.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    },
  },
  mounted() {
    window.addEventListener("mousemove", this.moveCursor);
  },
};
</script>

<style lang="scss" scoped>
.cursorfriend {
  width: 2rem;
  height: 2rem;
  border-radius: 1rem;
  background: var(--cursor-color);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;

  display: none;
}
</style>
