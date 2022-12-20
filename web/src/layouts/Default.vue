<template>
  <div
    class="layout"
    :style="`--cursor-color: ${$static.general.cursorColor.hex}`"
  >
    <Header />

    <transition name="fade" appear>
      <main class="site-main">
        <slot />
      </main>
    </transition>

    <Footer />

    <div class="cursor">
      <CursorFriend :color="$static.general.cursorColor.hex" />
    </div>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
  general: sanityGeneral (id: "general") {
    cursorColor {
      hex
    }
  }
}
</static-query>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorFriend from "@/components/CursorFriend";

export default {
  components: {
    Header,
    Footer,
    CursorFriend,
  },
};
</script>

<style lang="scss" scoped>
.layout {
  margin: 0 auto;
  cursor: none;

  .cursor {
    display: none;
  }
  &:hover {
    .cursor {
      display: block;
    }
  }
}

.site-main {
  width: 100%;
}
/*
.fade-enter-active {
  transition: opacity .6s;
}

.fade-enter {
  opacity: 0;
}*/
</style>
