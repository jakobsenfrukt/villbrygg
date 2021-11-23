// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// We import object and document schemas
import general from './documents/general'
import product from './documents/product'
import article from './documents/article'
import about from './documents/about'
import faq from './documents/faq'

import body from './objects/body'
import figure from './objects/figure'
import simpleText from './objects/simpleText'
import contact from './objects/contact'
import newsletter from './objects/newsletter'
import seo from './objects/seo'

import { translateFields } from './fieldTranslation'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    // The following are document types which will appear
    // in the studio.
    // Any base object you've defined,
    // or document type that should not have
    // field-level validations
    general,
    article,
    // When added to this list, object types can be used as
    // { type: 'typename' } in other document schemas
    body,
    figure,
    simpleText,
    contact,
    newsletter,
    seo
  ])
  // Include documents with field translation support.
  // This changes their structure, transforming
  // simple fields like 'string' into 'object'
  // with multiple string properties, one per
  // language.
  //
  // Any document definition that does
  // not set localize: true on root level, or
  // set localize: true on any field level will
  // not be changed.
  .concat(translateFields([
    product,
    about,
    faq
  ]))
})
