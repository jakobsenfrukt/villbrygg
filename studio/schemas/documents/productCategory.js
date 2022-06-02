export default {
  name: 'productCategory',
  type: 'document',
  title: 'Product category',
  fields: [
    {
      name: 'title',
      type: 'localeString',
      title: 'Title'
    },
    {
      name: 'description',
      type: 'localeText',
      title: 'Description'
    },
    {
      name: 'color',
      type: 'color',
      title: 'Color'
    }
  ],
  preview: {
    select: {
      title: 'title.en'
    }
  }
}
