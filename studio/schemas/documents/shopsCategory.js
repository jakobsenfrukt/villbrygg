export default {
  name: 'shopsCategory',
  type: 'document',
  title: 'Location type',
  fields: [
    {
      name: 'title',
      type: 'localeString',
      title: 'Category title'
    }
  ],
  preview: {
    select: {
      title: 'title.en'
    }
  }
}
