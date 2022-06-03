export default {
  name: 'frontpage',
  type: 'document',
  title: 'Front page',
  //__experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'], 
  fields: [
    {
      name: 'pageHeader',
      type: 'pageHeader'
    },
    {
      title: 'Products heading',
      name: 'productText',
      type: 'localeSimpleBody'
    },
    {
      title: 'Featured products',
      name: 'featuredProducts',
      type: 'array',
      of: [
        {
          title: 'Product',
          type: 'reference',
          to: [
            {
              type: 'product'
            }
          ]
        }
      ]
    },
    {
      title: 'Articles heading',
      name: 'articleText',
      type: 'localeSimpleBody'
    },
    {
      title: 'Featured articles (English)',
      name: 'featuredArticlesEn',
      type: 'array',
      of: [
        {
          title: 'Article',
          type: 'reference',
          to: [
            {
              type: 'article'
            }
          ]
        }
      ]
    },
    {
      title: 'Featured articles (Norwegian)',
      name: 'featuredArticlesNo',
      type: 'array',
      of: [
        {
          title: 'Article',
          type: 'reference',
          to: [
            {
              type: 'article'
            }
          ]
        }
      ]
    },
  ]
}
