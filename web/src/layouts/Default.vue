<template>
  <div class="layout">
    <Header />

    Current locale: {{ $context.locale }}<br />
    Current locale: {{ $i18n.locale }}<br />
    {{ $t('messages.welcome') }}

    <transition name="fade" appear>
      <main class="site-main">
        <slot/>
      </main>
    </transition>

    <Footer />
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
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss" scoped>
.layout {
  margin: 0 auto;
}

.site-main {
  margin: 0;
}

.fade-enter-active {
  transition: opacity .6s;
}

.fade-enter {
  opacity: 0;
}
</style>
