export default {
  name: 'productpage',
  type: 'document',
  title: 'Product page',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'], 
  fields: [
    {
      name: 'pageHeader',
      type: 'pageHeader'
    },
    {
      title: 'Featured articles heading',
      name: 'articleText',
      type: 'localeSimpleBody'
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
    }
  ]
}
