<template>
  <footer class="site-footer">
    <div class="site-footer-wrapper">
      <div class="main-footer-content">
        <div class="logo-wrapper">
          <g-link :to="$tp('/')" class="logo"><Logo /></g-link>
        </div>
        <div class="footer-contact">
          <ul>
            <li>
              <a
                :href="`mailto:${$static.general.contact.email}`"
                target="_blank"
                >{{ $static.general.contact.email }}</a
              >
            </li>
            <li>
              <a
                v-if="$static.general.contact.instagram"
                :href="
                  `https://instagram.com/${$static.general.contact.instagram}`
                "
                target="_blank"
                >Instagram</a
              >
            </li>
            <li>
              <a
                v-if="$static.general.contact.facebook"
                :href="
                  `https://facebook.com/${$static.general.contact.facebook}`
                "
                target="_blank"
                >Facebook</a
              >
            </li>
            <li class="address">
              <block-content
                :blocks="$static.general.contact._rawAddress"
                v-if="$static.general.contact._rawAddress"
              />
            </li>
          </ul>
        </div>
        <div>
          <nav class="footer-nav">
            <ul>
              <li>
                <g-link class="nav__link" :to="$tp($t('slug.faq'))">{{
                  $t("menu.faq")
                }}</g-link>
              </li>
              <li>
                <a
                  v-if="$static.general.newsletterUrl"
                  class="nav__link"
                  :href="$static.general.newsletterUrl"
                  target="_blank"
                  >{{ $t("menu.newsletter") }}</a
                >
              </li>
              <li>
                <g-link class="nav__link" :to="$tp($t('slug.reseller'))">{{
                  $t("menu.reseller")
                }}</g-link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    <div class="privacy">
      <g-link :to="$tp($t('slug.privacy'))">{{ $t("menu.privacy") }}</g-link>
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
    newsletterUrl
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
  &-wrapper {
    width: 100%;
    background: var(--color-darkgreen);
    color: var(--color-white);
    border-radius: var(--border-radius-l);
  }

  .main-footer-content {
    width: 100%;
    max-width: var(--layout-max-width);
    margin: 0 auto;
    padding: calc(var(--spacing-sitepadding) * 2) var(--spacing-sitepadding)
      var(--spacing-sitepadding);
    position: relative;
    overflow: hidden;

    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: flex-end;
    gap: calc(var(--spacing-sitepadding) * 2);
  }

  .logo-wrapper {
    grid-column: 1 / -1;
  }
  .logo {
    display: inline-block;
    margin-bottom: 2rem;
  }
  a {
    color: inherit;
    &:hover {
      color: var(--color-hover-light);
    }
  }
}
.footer-contact {
  font-size: var(--font-size-m);

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .address {
    margin-top: 1.5rem;
  }
}
.footer-nav {
  font-size: var(--font-size-l);
  text-align: right;
  margin-bottom: 1.3rem;
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
.privacy {
  font-size: var(--font-size-xs);
  color: var(--color-white);
  width: 100%;
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding: calc(var(--spacing-sitepadding) / 2) var(--spacing-sitepadding);
  a {
    opacity: 0.5;
  }
}
@media (max-width: 900px) {
  .site-footer .main-footer-content {
    grid-template-columns: 1fr;
  }
}
</style>
