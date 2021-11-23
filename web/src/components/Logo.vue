<template>
  <div class="logo">
    Villbrygg
  </div>
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
