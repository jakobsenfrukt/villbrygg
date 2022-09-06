const otherPath = (locale, path) => {
  return {
    route: {
      meta: {
        translatedPaths: {
          [locale]: path,
        },
      },
    },
  };
};

module.exports = {
  no: [
    {
      path: "/no",
      component: "./src/pages/index.vue",
    },
    {
      path: "/no/om",
      component: "./src/pages/about.vue",
      ...otherPath("en", "/en/about")
    },
    {
      path: "/no/artikler",
      component: "./src/pages/articles.vue",
      ...otherPath("en", "/en/articles")
    },
    {
      path: "/no/kontakt",
      component: "./src/pages/contact.vue",
      ...otherPath("en", "/en/contact")
    },
    {
      path: "/no/faq",
      component: "./src/pages/faq.vue",
      ...otherPath("en", "/en/faq")
    },
    {
      path: "/no/personvern",
      component: "./src/pages/privacy.vue",
      ...otherPath("en", "/en/privacy")
    },
    {
      path: "/no/produkter",
      component: "./src/pages/products.vue",
      ...otherPath("en", "/en/products")
    },
    {
      path: "/no/forhandler",
      component: "./src/pages/reseller.vue",
      ...otherPath("en", "/en/reseller")
    },
    {
      path: "/no/butikker",
      component: "./src/pages/shops.vue",
      ...otherPath("en", "/en/shops")
    },
  ],
  en: [
    {
      path: "/en",
      component: "./src/pages/index.vue",
    },
    {
      path: "/en/about",
      component: "./src/pages/about.vue",
      ...otherPath("no", "/no/om")
    },
    {
      path: "/en/articles",
      component: "./src/pages/articles.vue",
      ...otherPath("no", "/no/artikler")
    },
    {
      path: "/en/contact",
      component: "./src/pages/contact.vue",
      ...otherPath("no", "/no/kontakt")
    },
    {
      path: "/en/faq",
      component: "./src/pages/faq.vue",
      ...otherPath("no", "/no/faq")
    },
    {
      path: "/en/privacy",
      component: "./src/pages/privacy.vue",
      ...otherPath("no", "/no/personvern")
    },
    {
      path: "/en/products",
      component: "./src/pages/products.vue",
      ...otherPath("no", "/no/produkter")
    },
    {
      path: "/en/reseller",
      component: "./src/pages/reseller.vue",
      ...otherPath("no", "/no/forhandler")
    },
    {
      path: "/en/shops",
      component: "./src/pages/shops.vue",
      ...otherPath("no", "/no/butikker")
    },
  ],
};