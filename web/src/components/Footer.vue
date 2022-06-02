<template>
  <footer class="site-footer">
    <div class="logo-wrapper">
      <g-link :to="$tp('/')" class="logo"><Logo /></g-link>
    </div>
    <!--<ul class="contact">
      <li>
        <a
          :href="`https://instagram.com/${$static.general.contact.instagram}`"
          target="_blank"
          >Instagram</a
        >
      </li>
      <li>
        <a
          :href="`https://facebook.com/${$static.general.contact.facebook}`"
          target="_blank"
          >Facebook</a
        >
      </li>
    </ul>-->
    <div class="footer-contact">
      <a :href="`mailto:${$static.general.contact.email}`" target="_blank">{{
        $static.general.contact.email
      }}</a>
      <block-content
        :blocks="$static.general.contact._rawAddress"
        v-if="$static.general.contact._rawAddress"
      />
    </div>
    <div>
      <nav class="footer-nav">
        <ul>
          <li>
            <g-link class="nav__link" :to="$tp('/faq/')">{{
              $t("menu.faq")
            }}</g-link>
          </li>
          <li>
            <g-link class="nav__link" :to="$tp('/')">{{
              $t("menu.newsletter")
            }}</g-link>
          </li>
          <li>
            <g-link class="nav__link" :to="$tp('/')">{{
              $t("menu.reseller")
            }}</g-link>
          </li>
        </ul>
      </nav>
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
import Logo from "~/components/Logo";
import BlockContent from "~/components/tools/BlockContent";

export default {
  components: {
    Logo,
    BlockContent,
  },
};
</script>

<style lang="scss" scoped>
.site-footer {
  width: 100%;
  background: var(--color-darkgreen);
  color: var(--color-white);
  padding: calc(var(--spacing-sitepadding) * 2) var(--spacing-sitepadding)
    var(--spacing-sitepadding);
  position: relative;
  overflow: hidden;
  border-radius: var(--border-radius-l);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(var(--spacing-sitepadding) * 2);

  .logo-wrapper {
    grid-column: 1 / -1;
  }
  .logo {
    display: inline-block;
    margin-bottom: 2rem;
  }
  a {
    color: inherit;
  }
}
.footer-contact {
  font-size: var(--font-size-m);
}
.footer-nav {
  font-size: var(--font-size-l);
  text-align: right;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
    line-height: 1.5;
    &:after {
      content: " →";
    }
  }
}
@media (max-width: 1000px) {
  .site-footer {
    grid-template-columns: 1fr;
  }
}
</style>
