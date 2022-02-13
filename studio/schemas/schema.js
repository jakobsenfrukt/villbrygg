// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas

// documents
import general from './documents/general'
import product from './documents/product'
import article from './documents/article'
import about from './documents/about'
import faq from './documents/faq'
import faqQuestion from './documents/faqQuestion'
import faqCategory from './documents/faqCategory'
import shops from './documents/shops'
import shopsCity from './documents/shopsCity'
import shopsCountry from './documents/shopsCountry'
import shopsCategory from './documents/shopsCategory'
import articlesCategory from './documents/articlesCategory'
import productCategory from './documents/productCategory'
import frontpage from './documents/frontpage'

// objects
import body from './objects/body'
import figure from './objects/figure'
import figureCaptioned from './objects/figureCaptioned'
import simpleBody from './objects/simpleBody'
import contact from './objects/contact'
import newsletter from './objects/newsletter'
import seo from './objects/seo'
import shop from './objects/shop'
import pageHeader from './objects/pageHeader'

// localized objects
import localeString from './objects/localeString'
import localeText from './objects/localeText'
import localeSimpleBody from './objects/localeSimpleBody'
import localeBody from './objects/localeBody'
import localeFigure from './objects/localeFigure'
import localeFigureCaptioned from './objects/localeFigureCaptioned'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // documents
    general,
    product,
    article,
    about,
    faq,
    faqQuestion,
    faqCategory,
    shops,
    shopsCity,
    shopsCountry,
    shopsCategory,
    articlesCategory,
    productCategory,
    frontpage,
    // objects
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    body,
    figure,
    figureCaptioned,
    simpleBody,
    contact,
    newsletter,
    seo,
    shop,
    pageHeader,
    // localized objects
    localeString,
    localeText,
    localeSimpleBody,
    localeBody,
    localeFigure,
    localeFigureCaptioned
  ])
})
