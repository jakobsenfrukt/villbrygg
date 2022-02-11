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
  left: -2.6rem;
  top: 16rem;
  transform: rotate(-90deg);
  transform-origin: 100% 0;
  display: flex;
  gap: 2rem;
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
      left: -1rem;
      top: 0.4rem;
      background: var(--color-text);
      width: 0.5rem;
      height: 0.5rem;
      border-radius: var(--border-radius-l);
    }
  }
}
</style>
