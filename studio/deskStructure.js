import S from '@sanity/desk-tool/structure-builder'

import { MdSettings, MdLiquor, MdQuestionAnswer, MdInfo, MdLocationPin, MdArticle } from 'react-icons/md'

const hiddenDocTypes = listItem =>
  !['general', 'product', 'article', 'about', 'faq'].includes(listItem.getId())

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('General')
        .icon(MdSettings)
        .child(
          S.editor()
            .title('General')
            .id('general')
            .schemaType('general')
            .documentId('general')
        ),
      S.listItem()
        .title('Products')
        .icon(MdLiquor)
        .schemaType('product')
        .child(S.documentTypeList('product').title('Products')),
      S.listItem()
        .title('Locations')
        .icon(MdLocationPin)
        .schemaType('product')
        .child(S.documentTypeList('product').title('Products')),
      S.listItem()
        .title('Articles')
        .icon(MdArticle)
        .schemaType('article')
        .child(S.documentTypeList('article').title('Articles')),
      S.listItem()
        .title('About')
        .icon(MdInfo)
        .child(
          S.editor()
            .title('About')
            .id('about')
            .schemaType('about')
            .documentId('about')
        ),
      S.listItem()
        .title('FAQ')
        .icon(MdQuestionAnswer)
        .child(
          S.editor()
            .title('FAQ')
            .id('faq')
            .schemaType('faq')
            .documentId('faq')
        ),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
