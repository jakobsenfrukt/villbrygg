<template>
  <div class="locale-switcher">
    <!--<select v-model="currentLocale" @change="localeChanged">
      <option v-for="locale in availableLocales" :key="locale" :value="locale">{{ locale }}</option>
    </select>-->
    <button
      v-for="locale in availableLocales"
      :key="locale"
      @click="changeLocale(locale)"
      class="localebutton"
      :class="currentLocale === locale ? 'active' : ''"
    >
      {{ locale }}
    </button>
  </div>
</template>

<script>
export default {
  name: "LocaleSwitcher",
  data: function() {
    return {
      currentLocale: this.$i18n.locale.toString(),
      availableLocales: this.$i18n.availableLocales,
    };
  },
  methods: {
    /*localeChanged() {
      this.$router.push({
        path: this.$tp(this.$route.path, this.currentLocale, true),
      });
    },*/
    changeLocale(locale) {
      this.currentLocale = locale;
      this.$router.push({
        path: this.$tp(this.$route.path, this.currentLocale, true),
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.locale-switcher {
  position: absolute;
  left: -3.2rem;
  top: 12rem;
  transform: rotate(-90deg);
  transform-origin: 100% 0;
  display: flex;
  gap: 2em;
}
.localebutton {
  outline: none;
  border: none;
  background: none;
  padding: 0;
  display: inline-block;
  font-family: inherit;
  font-size: inherit;
  text-transform: uppercase;
  color: var(--color-lightgray);
  position: relative;
  cursor: pointer;
  &:nth-of-type(2) {
    order: 1;
  }
  &:nth-of-type(1) {
    order: 2;
  }
  &:hover {
    color: var(--color-text);
  }
  &.active {
    color: var(--color-text);
    &:before {
      content: "";
      display: block;
      position: absolute;
      left: -1em;
      top: 0.4em;
      background: var(--color-text);
      width: 0.5em;
      height: 0.5em;
      border-radius: var(--border-radius-l);
    }
  }
}

@media (max-width: 1000px) {
  .locale-switcher {
    transform: none;
    position: absolute;
    bottom: 0.25rem;
    right: 0.25rem;
    left: auto;
    top: auto;
    padding: var(--spacing-sitepadding);
    font-size: var(--font-size-l);
  }
  .localebutton {
    color: var(--color-background);
    &.active {
      color: var(--color-background);
      &:before {
        background: var(--color-background);
      }
    }
  }
}
</style>
