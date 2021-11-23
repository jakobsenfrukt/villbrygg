<template>
  <header class="site-header">
    <g-link class="logo" to="/"><Logo /></g-link>
    <nav class="nav nav-main">
      <g-link class="nav__link" to="/">Home</g-link>
      <g-link class="nav__link" to="/products/">Products</g-link>
      <g-link class="nav__link" to="/about/">About</g-link>
      <!--<ToggleTheme />-->
    </nav>
  </header>
</template>

<script>
import Logo from '@/components/Logo'
import ToggleTheme from '@/components/ToggleTheme'

export default {
  components: {
    Logo,
    ToggleTheme
  },
  data() {
    return {
      showMenu: false
    }
  }
}
</script>

<style lang="scss" scoped>
.site-header {
  width: 100%;
}
</style>
