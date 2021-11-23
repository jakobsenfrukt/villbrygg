// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})

const clientConfig = require('./client-config')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  siteName: 'Villbrygg',

  templates: {
    SanityProduct: '/products/:slug__current'
  },

  plugins: [
    {
      use: 'gridsome-source-sanity',
      options: {
        ...clientConfig.sanity,
        typeName: 'Sanity',
        token: process.env.SANITY_TOKEN,
        overlayDrafts: !isProd,
        watchMode: !isProd
      }
    },
    {
      use: "gridsome-plugin-i18n",
      options: {
        locales: [ // locales list
          'nb-no',
          'en-gb'
        ],
        pathAliases: { // path segment alias for each locales
          'nb-no': 'no',
          'en-gb': 'en'
        },
        fallbackLocale: 'nb-no', // fallback language
        defaultLocale: 'nb-no', // default language
        enablePathRewrite: true, // rewrite path with locale prefix, default: true
        rewriteDefaultLanguage: true, // rewrite default locale, default: true
        /*messages: {
          'nb-no': require('./src/locales/nb-no.json'), // Messages files
          'en-gb': require('./src/locales/en-gb.json'),
        }*/
      }
    }
  ]
}
