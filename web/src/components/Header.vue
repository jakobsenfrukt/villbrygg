<template>
  <header class="site-header">
    <g-link class="logo" :to="$tp('/')"><Logo /></g-link>
    <nav class="nav nav-main">
      <ul>
        <li>
          <g-link class="nav__link" :to="$tp('/products/')"
            ><span>{{ $t("menu.products") }}</span></g-link
          >
        </li>
        <li>
          <g-link class="nav__link" :to="$tp('/shops/')"
            ><span>{{ $t("menu.shops") }}</span></g-link
          >
        </li>
        <li>
          <g-link class="nav__link" :to="$tp('/about/')"
            ><span>{{ $t("menu.about") }}</span></g-link
          >
        </li>
        <li>&nbsp;</li>
        <LocaleSwitcher />
        <!--<ToggleTheme />-->
      </ul>
    </nav>
  </header>
</template>

<script>
import Logo from "@/components/Logo";
import LocaleSwitcher from "@/components/tools/LocaleSwitcher";
import ToggleTheme from "@/components/tools/ToggleTheme";

export default {
  components: {
    Logo,
    LocaleSwitcher,
    ToggleTheme,
  },
  data() {
    return {
      showMenu: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.site-header {
  width: 100%;
  padding: var(--spacing-sitepadding);
  background: var(--color-background);
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  align-items: center;

  a {
    color: inherit;
    text-decoration: none;
    text-transform: uppercase;
  }
}
.logo {
  grid-column: 1 / span 4;
}
.nav-main {
  grid-column: 5 / span 6;
  ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      display: inline-block;
    }
  }
}
.nav__link {
  display: block;
  color: inherit;
  text-decoration: none;
  text-transform: uppercase;
  position: relative;

  span {
    position: relative;
    z-index: 10;
  }

  &.active--exact,
  &:hover {
    &:before {
      content: " ";
      position: absolute;
      top: -0.15rem;
      left: -1rem;
      width: calc(100% + 2rem);
      height: calc(100% + 0.3rem);
      background: var(--color-highlight);
      border-radius: 5rem;
    }
  }
}
</style>
