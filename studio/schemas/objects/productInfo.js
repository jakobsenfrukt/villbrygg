export default {
  name: 'productInfo',
  type: 'object',
  title: 'Product info',
  fields: [
    {
      name: 'title',
      type: 'localeString',
      title: 'Title'
    },
    {
      name: 'body',
      type: 'localeBody',
      title: 'Main text'
    }
  ],
  preview: {
    select: {
      title: 'title.en'
    }
  }
}
