<template>
  <header class="site-header">
    <g-link class="logo" :to="$tp('/')"><Logo /></g-link>
    <nav class="nav nav-main">
      <g-link class="nav__link" :to="$tp('/')">Home</g-link>
      <g-link class="nav__link" :to="$tp('/products/')">Products</g-link>
      <g-link class="nav__link" :to="$tp('/about/')">About</g-link>
      <LocaleSwitcher />
      <!--<ToggleTheme />-->
    </nav>
  </header>
</template>

<script>
import Logo from '@/components/Logo'
import LocaleSwitcher from '@/components/tools/LocaleSwitcher'
import ToggleTheme from '@/components/tools/ToggleTheme'

export default {
  components: {
    Logo,
    LocaleSwitcher,
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
