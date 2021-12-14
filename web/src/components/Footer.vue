<template>
  <footer class="site-footer">
    <g-link class="logo" :to="$tp('/')"><Logo /></g-link>
    <ul class="contact">
      <li><a :href="`https://instagram.com/${$static.general.contact.instagram}`" target="_blank">Instagram</a></li>
      <li><a :href="`https://facebook.com/${$static.general.contact.facebook}`" target="_blank">Facebook</a></li>
    </ul>
    <div>
      <a :href="`mailto:${$static.general.contact.email}`" target="_blank">{{ $static.general.contact.email }}</a>
      <block-content
        :blocks="$static.general.contact._rawAddress"
        v-if="$static.general.contact._rawAddress"
      />
    </div>
  </footer>
</template>

<static-query>
query {
  general: sanityGeneral (id: "general") {
    contact {
      email
      instagram
      facebook
      _rawAddress
    }
  }
}
</static-query>

<script>
import Logo from '~/components/Logo'
import BlockContent from '~/components/tools/BlockContent'

export default {
  components: {
    Logo,
    BlockContent
  },
}
</script>

<style lang="scss" scoped>
.site-footer {
  width: 100%;
  background: var(--color-paleyellow);
  padding: 4rem 2rem;
  position: relative;
  overflow: hidden;
  a {
    color: inherit;
  }
  
  &-content {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 3rem;
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
  }

  .intro {
    grid-column: span 2;
  }

  .link-list {
    list-style: none;

    strong {
      font-family: var(--font-tightblack);
      font-size: 1.2rem;
    }

    li {
      display: block;
      color: inherit;
      text-decoration: none;
      margin-right: 1.8rem;
      text-transform: uppercase;
      letter-spacing: 0.16em;
      font-family: var(--font-sans);
    }
  }
}
@media (max-width: 900px) {
  .site-footer {
    &-content {
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
    }
    .intro {
      grid-column: span 4;
      padding-right: 50%;
    }
  }
}
@media (max-width: 540px) {
  .site-footer {
    &-content {
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }
    .intro {
      grid-column: span 2;
      padding-right: 50%;
    }
  }
}
</style>
