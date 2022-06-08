<template>
  <div class="layout">
    <Header />

    <transition name="fade" appear>
      <main class="site-main">
        <slot />
      </main>
    </transition>

    <Footer />

    <CursorFriend />
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
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
