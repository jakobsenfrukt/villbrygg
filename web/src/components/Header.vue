<template>
  <header class="site-header">
    <g-link class="logo" :to="$tp('/')"><Logo /></g-link>
    <nav class="nav nav-main">
      <g-link class="nav__link" :to="$tp('/')">{{ $t('menu.home') }}</g-link>
      <g-link class="nav__link" :to="$tp('/products/')">{{ $t('menu.products') }}</g-link>
      <g-link class="nav__link" :to="$tp('/shops/')">{{ $t('menu.shops') }}</g-link>
      <g-link class="nav__link" :to="$tp('/about/')">{{ $t('menu.about') }}</g-link>
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
  padding: var(--site-padding);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nav-main {
  display: flex;
  gap: 1rem;
}
</style>
