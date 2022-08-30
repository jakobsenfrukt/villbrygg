import S from '@sanity/desk-tool/structure-builder'

import { MdSettings, MdLiquor, MdQuestionAnswer, MdInfo, MdLocationPin, MdArticle, MdOutlineArticle, MdStore, MdLocationCity, MdPublic, MdHome, MdCategory, MdEmail, MdPeople, MdLaptopMac, MdAddBusiness, MdPrivacyTip } from 'react-icons/md'

const hiddenDocTypes = listItem =>
  !['general', 'product', 'article', 'about', 'faq', 'faqQuestion', 'faqCategory', 'shops', 'onlineShop', 'location', 'shopsCountry', 'shopsCity', 'shopsCategory', 'articlesCategory', 'productCategory', 'frontpage', 'contactpage', 'productpage', 'articlepage', 'person', 'reseller', 'privacy'].includes(listItem.getId())

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
        .title('Front page')
        .icon(MdHome)
        .child(
          S.editor()
            .title('Front page')
            .id('frontpage')
            .schemaType('frontpage')
            .documentId('frontpage')
        ),
      S.listItem()
        .title('Products')
        .icon(MdLiquor)
        .schemaType('product')
        .child(
          S.list()
            .id('products')
            .title('Products')
            .items(
              [
                S.listItem()
                .title('Main page')
                .icon(MdArticle)
                .child(
                  S.editor()
                    .title('Product page')
                    .id('productpage')
                    .schemaType('productpage')
                    .documentId('productpage')
                ),
                S.listItem()
                .title('All products')
                .schemaType('product')
                .icon(MdLiquor)
                .child(
                  S.documentTypeList('product')
                    .title('Product list')
                ),
                S.listItem()
                .title('Categories')
                .schemaType('productCategory')
                .icon(MdCategory)
                .child(
                  S.documentTypeList('productCategory')
                    .title('Categories')
                )
              ]
            )
        ),
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
                .title('Online shops')
                .icon(MdLaptopMac)
                .child(
                  S.documentList()
                    .title('Online shops by country')
                    .id('shopsCountries')
                    .filter('_type == "shopsCountry"')
                    .defaultOrdering([{field: 'name.en', direction: 'asc'}])
                    .menuItems(S.documentTypeList('shopsCountry').getMenuItems())
                    .child(id =>
                    S.documentList()
                      .id('onlineShop')
                      .title('Online Shops')
                      .filter('_type == "onlineShop" && $id in countries[]._ref')
                      .params({id})
                      .defaultOrdering([{field: 'name', direction: 'asc'}])
                      .menuItems(S.documentTypeList('onlineShop').getMenuItems())
                    ) 
                ),
                S.listItem()
                .title('Locations')
                .icon(MdLocationPin)
                .child(
                  S.documentList()
                    .title('Locations by city')
                    .id('shopsCities')
                    .filter('_type == "shopsCity"')
                    .defaultOrdering([{field: 'name.en', direction: 'asc'}])
                    .menuItems(S.documentTypeList('shopsCity').getMenuItems())
                    .child(id =>
                    S.documentList()
                      .id('locations')
                      .title('Locations')
                      .filter('_type == "location" && city._ref == $id')
                      .params({id})
                      .defaultOrdering([{field: 'name', direction: 'asc'}])
                      .menuItems(S.documentTypeList('location').getMenuItems())
                    ) 
                ),
                S.listItem()
                .title('Cities')
                .icon(MdLocationCity)
                .child(
                  S.documentList()
                    .title('Cities by country')
                    .id('shopsCountries')
                    .filter('_type == "shopsCountry"')
                    .defaultOrdering([{field: 'name.en', direction: 'asc'}])
                    .menuItems(S.documentTypeList('shopsCountry').getMenuItems())
                    .child(id =>
                    S.documentList()
                      .id('cities')
                      .title('Cities')
                      .filter('_type == "shopsCity" && country._ref == $id')
                      .params({id})
                      .defaultOrdering([{field: 'name.en', direction: 'asc'}])
                      .menuItems(S.documentTypeList('shopsCity').getMenuItems())
                    ) 
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
                    .defaultOrdering([{field: 'name.en', direction: 'asc'}])
                    .menuItems(S.documentTypeList('shopsCountry').getMenuItems())
                ),
                S.listItem()
                .title('Categories')
                .schemaType('shopsCategory')
                .icon(MdCategory)
                .child(
                  S.documentList()
                    .id('shopsCategories')
                    .title('Categories')
                    .filter('_type == "shopsCategory"')
                    .defaultOrdering([{field: 'title.en', direction: 'asc'}])
                    .menuItems(S.documentTypeList('shopsCategory').getMenuItems())
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
                .title('Main page')
                .icon(MdHome)
                .child(
                  S.editor()
                    .title('Article page')
                    .id('articlePage')
                    .schemaType('articlepage')
                    .documentId('articlepage')
                ),
                S.listItem()
                .title('Norwegian')
                .schemaType('article')
                .icon(MdArticle)
                .child(
                  S.documentList()
                    .id('noArticles')
                    .title('Norwegian articles')
                    .filter('_type == "article" && (!defined(locale) || locale == "no")')
                    .defaultOrdering([{field: 'title', direction: 'asc'}])
                    .menuItems(S.documentTypeList('article').getMenuItems())
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
                    .defaultOrdering([{field: 'title', direction: 'asc'}])
                    .menuItems(S.documentTypeList('article').getMenuItems())
                ),
                S.listItem()
                .title('Categories')
                .schemaType('articlesCategory')
                .icon(MdCategory)
                .child(
                  S.documentList()
                    .id('articlesCategories')
                    .title('Categories')
                    .filter('_type == "articlesCategory"')
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
                    .defaultOrdering([{field: 'question.en', direction: 'asc'}])
                    .menuItems(S.documentTypeList('faqQuestion').getMenuItems())
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
                    .defaultOrdering([{field: 'title.en', direction: 'asc'}])
                    .menuItems(S.documentTypeList('faqCategory').getMenuItems())
                )
              ]
            )
        ),
      S.listItem()
        .title('Contact')
        .icon(MdEmail)
        .child(
          S.list()
            .id('contact')
            .title('Contact')
            .items(
              [
                S.listItem()
                .title('Main page')
                .icon(MdArticle)
                .child(
                  S.editor()
                    .title('Contact page')
                    .id('contactpage')
                    .schemaType('contactpage')
                    .documentId('contactpage')
                ),
                S.listItem()
                .title('People')
                .schemaType('person')
                .icon(MdPeople)
                .child(
                  S.documentList()
                    .id('people')
                    .title('People')
                    .filter('_type == "person"')
                    .defaultOrdering([{field: 'name', direction: 'asc'}])
                    .menuItems(S.documentTypeList('person').getMenuItems())
                )
              ]
            )
        ),
      S.listItem()
        .title('Become a reseller')
        .icon(MdAddBusiness)
        .child(
          S.editor()
            .title('Become a reseller')
            .id('reseller')
            .schemaType('reseller')
            .documentId('reseller')
        ),
      S.listItem()
        .title('Privacy policy')
        .icon(MdPrivacyTip)
        .child(
          S.editor()
            .title('Privacy policy')
            .id('privacy')
            .schemaType('privacy')
            .documentId('privacy')
        ),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
