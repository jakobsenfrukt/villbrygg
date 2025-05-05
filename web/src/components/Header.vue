<template>
  <header class="site-header-wrapper">
    <div class="site-header">
      <g-link class="logo" :to="$tp('/')"><Logo /></g-link>
      <nav class="nav nav-main">
        <ul>
          <li>
            <g-link class="nav__link" :to="$tp($t('slug.products'))"
              ><span>{{ $t("menu.products") }}</span></g-link
            >
          </li>
          <li>
            <g-link class="nav__link" :to="$tp($t('slug.shops'))"
              ><span>{{ $t("menu.shops") }}</span></g-link
            >
          </li>
          <li>
            <g-link class="nav__link" :to="$tp($t('slug.about'))"
              ><span>{{ $t("menu.about") }}</span></g-link
            >
          </li>
          <li>
            <g-link class="nav__link" :to="$tp($t('slug.contact'))"
              ><span>{{ $t("menu.contact") }}</span></g-link
            >
          </li>
          <!--<li v-if="$context.locale === 'no' && $static.general.investUrl">
            <g-link class="nav__link nav__link--invest" :to="$static.general.investUrl">
              <span>Bli medeier</span>
            </g-link>
          </li>-->
          <LocaleSwitcher />
        </ul>
      </nav>
      <div class="nav-mobile-wrapper" :class="{ open: showMenu }">
        <div role="button" @click="toggleMenu" class="menu-toggle">
          <MenuIcon class="menu-toggle-icon" :open="showMenu" />
        </div>
        <nav class="nav-mobile">
          <ul>
            <li>
              <g-link class="nav__link" :to="$tp($t('slug.products'))"
                ><span>{{ $t("menu.products") }}</span></g-link
              >
            </li>
            <li>
              <g-link class="nav__link" :to="$tp($t('slug.shops'))"
                ><span>{{ $t("menu.shops") }}</span></g-link
              >
            </li>
            <li>
              <g-link class="nav__link" :to="$tp($t('slug.about'))"
                ><span>{{ $t("menu.about") }}</span></g-link
              >
            </li>
            <li>
              <g-link class="nav__link" :to="$tp($t('slug.contact'))"
                ><span>{{ $t("menu.contact") }}</span></g-link
              >
            </li>
            <!--<li v-if="$context.locale === 'no' && $static.general.investUrl">
              <g-link class="nav__link nav__link--invest" :to="$static.general.investUrl">
                <span>Bli medeier</span>
              </g-link>
            </li>-->
            <LocaleSwitcher />
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>


<static-query>
  query {
    general: sanityGeneral (id: "general") {
      investUrl
    }
  }
</static-query>

<script>
import Logo from "@/components/Logo";
import LocaleSwitcher from "@/components/tools/LocaleSwitcher";
import ToggleTheme from "@/components/tools/ToggleTheme";
import MenuIcon from "@/components/icons/MenuIcon.vue";

export default {
  components: {
    Logo,
    LocaleSwitcher,
    ToggleTheme,
    MenuIcon,
  },
  data() {
    return {
      showMenu: false,
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
  },
};
</script>

<style lang="scss" scoped>
.site-header-wrapper {
  background: var(--color-background);
}
.site-header {
  position: relative;
  width: 100%;
  max-width: var(--layout-max-width);
  margin: 0 auto;
  padding: var(--spacing-sitepadding);
  background: var(--color-background);
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  align-items: center;
  margin-bottom: -1px;
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
    margin-left: calc(var(--spacing-sitepadding) / 4);
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
  color: inherit;
  cursor: none;

  span {
    position: relative;
    z-index: 10;
  }

  &.active--exact,
  &:hover {
    color: var(--color-black);
    &:before {
      content: " ";
      position: absolute;
      top: -0.25rem;
      left: -0.75rem;
      width: calc(100% + 1.5rem);
      height: calc(100% + 0.5rem);
      background: var(--color-active);
      border-radius: 5rem;
    }
  }

  &:last-of-type {
    margin-right: .75rem;
  }

  &--invest {
    color: #fff;
    margin-left: .5rem;
    display: inline-flex;
    align-items: center;
    span {
      order: 2;
    }
    &:before {
      content: " ";
      position: absolute;
      top: -0.25rem;
      left: -0.5rem;
      width: calc(100% + 1rem);
      height: calc(100% + 0.5rem);
      background: var(--color-darkgreen);
      border-radius: 5rem;
    }
    &:after {
      content: " ";
      display: inline-block;
      background: rgb(0, 255, 65);
      width: 1rem;
      height: 1rem;
      margin-right: .5rem;
      border-radius: 1.2rem;
      animation: pulse 2s ease-in-out infinite;
      order: 1;
    }
    &:hover {
      color: rgb(0, 255, 65);
      &:before {
        content: " ";
        position: absolute;
        top: -0.25rem;
        left: -0.5rem;
        width: calc(100% + 1rem);
        height: calc(100% + 0.5rem);
        background: var(--color-darkgreen);
        border-radius: 5rem;
      }
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 255, 65, 0.7);
  }

  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 255, 65, 0);
  }

  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 255, 65, 0);
  }
}

.nav-mobile {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
  background: var(--color-darkgreen);
  color: var(--color-background);
  display: flex;
  justify-content: center;
  flex-direction: column;

  display: none;
  ul {
    list-style: none;
    margin: 0;
    padding: var(--spacing-sitepadding);
  }

  .nav__link {
    position: relative;
    margin-bottom: calc(var(--spacing-sitepadding) * 1.2);
    font-size: var(--font-size-l);
    text-transform: uppercase;
    letter-spacing: var(--letter-spacing);
    cursor: none;

    &.active--exact,
    &:hover {
      color: var(--color-hover-light);
      &:before {
        display: none;
      }
    }

    &--invest {
      margin-left: 0;

      &:after {
        margin-right: 1rem;
      }
    }
  }

  &-wrapper {
    display: none;
    &.open {
      height: 100vh;
    }
  }
}
.menu-toggle {
  position: absolute;
  height: 2rem;
  display: flex;
  align-items: center;
  top: 0.25rem;
  right: 0.25rem;
  padding: var(--spacing-sitepadding);
  z-index: 101;
  cursor: none;
  display: none;

  &-icon {
    display: block;
    width: 1.5rem;
    height: 1.5rem;
  }
}

@media (max-width: 1200px) {
  .nav {
    &-main {
      display: none;
      .nav-link {
        display: none;
      }
    }
    &-mobile {
      display: flex;
      opacity: 0;
      transform: translateY(-100%);
      &-wrapper {
        display: block;
      }
    }
  }
  .open {
    color: var(--color-background);
    .nav-mobile {
      opacity: 1;
      transform: translateY(0);
      animation: menuEnter 0.3s linear forwards;

      &-link {
        animation: menuItemEnter 0.3s linear forwards;
      }
    }
  }
  .menu-toggle {
    display: block;
  }
}

@keyframes menuEnter {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes menuItemEnter {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
