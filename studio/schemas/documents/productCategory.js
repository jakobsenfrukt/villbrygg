export default {
  name: 'productCategory',
  type: 'document',
  title: 'Product category',
  fields: [
    {
      name: 'title',
      type: 'localeString',
      title: 'Category title'
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
