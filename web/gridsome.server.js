// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const clientConfig = require('./client-config')

const { pathToPage } = require("./src/utils/localizedUrl");

const moment = require("moment");

module.exports = function(api) {
  api.loadSource(store => {
    // Use the Data store API here: https://gridsome.org/docs/data-store-api
    store.addMetadata('sanityOptions', clientConfig.sanity)
  })

  api.createSchema(({ addSchemaTypes }) => {
    addSchemaTypes(`
      type SanityDocument implements Node @infer {
        id: ID!
      }
    `)
  })

  api.createPages(async ({ createPage, graphql }) => {
    const response = await graphql(`
      query {
        articles: allSanityArticle {
          edges {
            node {
              _type
              id
              slug {
                current
              }
              locale
              publishedAt
            }
          }
        }
      }
    `);

    if (response.errors) {
      throw response.errors[0];
    }

    const createPageWithLocale = ({
      page,
      locale,
      path,
      translatedPaths,
      component,
    }) => {
      console.log("creating page", path, "from", page.id);
      createPage({
        path: path,
        component: component,
        context: {
          id: page.id,
          locale: locale,
        },
        route: {
          meta: {
            locale: locale,
            pageType: page._type,
            translatedPaths: translatedPaths,
          },
        },
      });
    };

    const makePath = ({ page, locale, slug }) => {
      const typeAndSlug = pathToPage(page, locale);
      return `/${locale}${typeAndSlug}`;
    };

    // Articles
    const articles = response.data.articles.edges;
    const today = moment()
      .startOf("day")
      .toDate();
    articles
      .map((edge) => edge.node)
      .filter((node) => node.slug?.current)
      .filter((node) => {
        if (!node.publishedAt) {
          return false;
        }
        const publishDate = moment(node.publishedAt)
          .startOf("day")
          .toDate();
        return publishDate <= today;
      })
      .forEach((page) =>
        createPageWithLocale({
          page: page,
          locale: page.locale,
          path: makePath({
            page,
            locale: page.locale,
            slug: page.slug.current,
          }),
          component: "./src/templates/SanityArticle.vue",
        })
      );
  });
}
