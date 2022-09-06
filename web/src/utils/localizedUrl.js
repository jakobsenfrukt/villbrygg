const slugByLocale = (page, locale) => page.slug[locale].current;

const pathToPage = (page, locale) => {
  const slug = page.slug.current ?? slugByLocale(page, locale);
  const type = {
    no: {
      article: "artikler",
    },
    en: {
      article: "articles",
    },
  }[locale][page._type];
  return `/${type}/${slug}`;
};

module.exports = { pathToPage, slugByLocale };