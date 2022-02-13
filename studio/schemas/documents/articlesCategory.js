export default {
  name: 'articlesCategory',
  type: 'document',
  title: 'Article category',
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
