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
    SanityArticle: '/articles/:slug__current'
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
          'no',
          'en'
        ],
        fallbackLocale: 'no', // fallback language
        defaultLocale: 'no', // default language
        enablePathRewrite: true, // rewrite path with locale prefix, default: true
        rewriteDefaultLanguage: true, // rewrite default locale, default: true
        messages: {
          'no': require('./src/locales/no.json'), // Messages files
          'en': require('./src/locales/en.json'),
        }
      }
    }
  ]
}
