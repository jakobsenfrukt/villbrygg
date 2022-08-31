<template>
  <div class="cursorfriend" :style="`--cursor-color: ${color}`"></div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: "hotpink",
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
      cursorFriend.style.top = `${mouseY}px`;
      cursorFriend.style.left = `${mouseX}px`;
    },
  },
  mounted() {
    window.addEventListener("mousemove", this.moveCursor);
  },
};
</script>

<style lang="scss" scoped>
.cursorfriend {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 1rem;
  background: var(--cursor-color);
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
  pointer-events: none;

  display: none;
}

@media (pointer: coarse) {
  .cursorfriend {
    display: none !important;
  }
}
</style>
