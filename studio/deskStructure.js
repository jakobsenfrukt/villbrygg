import S from '@sanity/desk-tool/structure-builder'

import { MdSettings, MdLiquor, MdQuestionAnswer, MdInfo, MdLocationPin, MdArticle, MdOutlineArticle, MdStore, MdLocationCity, MdPublic } from 'react-icons/md'

const hiddenDocTypes = listItem =>
  !['general', 'product', 'article', 'about', 'faq', 'faqQuestion', 'faqCategory', 'shops', 'shopsCountry', 'shopsCity'].includes(listItem.getId())

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
        .title('Shops')
        .icon(MdStore)
        .child(
          S.list()
            .id('shops')
            .title('Shops')
            .items(
              [
                S.listItem()
                .title('Main page')
                .icon(MdArticle)
                .child(
                  S.editor()
                    .title('Shops')
                    .id('shopsPage')
                    .schemaType('shops')
                    .documentId('shops')
                ),
                S.listItem()
                .title('Cities')
                .schemaType('shopsCity')
                .icon(MdLocationCity)
                .child(
                  S.documentList()
                    .id('shopsCities')
                    .title('Cities')
                    .filter('_type == "shopsCity"')
                ),
                S.listItem()
                .title('Countries')
                .schemaType('shopsCountry')
                .icon(MdPublic)
                .child(
                  S.documentList()
                    .id('shopsCountries')
                    .title('Countries')
                    .filter('_type == "shopsCountry"')
                ),
                S.listItem()
                .title('Categories')
                .schemaType('shopsCategory')
                .icon(MdOutlineArticle)
                .child(
                  S.documentList()
                    .id('shopsCategories')
                    .title('Categories')
                    .filter('_type == "shopsCategory"')
                )
              ]
            )
        ),
      S.listItem()
        .title('Articles')
        .icon(MdArticle)
        .child(
          S.list()
            .id('articles')
            .title('Articles')
            .items(
              [
                S.listItem()
                .title('Norwegian')
                .schemaType('article')
                .icon(MdArticle)
                .child(
                  S.documentList()
                    .id('noArticles')
                    .title('Norwegian articles')
                    .filter('_type == "article" && (!defined(locale) || locale == "no")')
                ),
                S.listItem()
                .title('English')
                .schemaType('article')
                .icon(MdOutlineArticle)
                .child(
                  S.documentList()
                    .id('enArticles')
                    .title('English articles')
                    .filter('_type == "article" && (!defined(locale) || locale == "en")')
                )
              ]
            )
        ),
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
          S.list()
            .id('faq')
            .title('FAQ')
            .items(
              [
                S.listItem()
                .title('Main page')
                .icon(MdArticle)
                .child(
                  S.editor()
                    .title('FAQ')
                    .id('faqPage')
                    .schemaType('faq')
                    .documentId('faq')
                ),
                S.listItem()
                .title('Questions')
                .schemaType('faqQuestion')
                .icon(MdQuestionAnswer)
                .child(
                  S.documentList()
                    .id('faqQuestions')
                    .title('Questions')
                    .filter('_type == "faqQuestion"')
                ),
                S.listItem()
                .title('Categories')
                .schemaType('faqCategory')
                .icon(MdOutlineArticle)
                .child(
                  S.documentList()
                    .id('faqCategories')
                    .title('Categories')
                    .filter('_type == "faqCategory"')
                )
              ]
            )
        ),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
