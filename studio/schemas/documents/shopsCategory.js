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
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [
        {field: 'title.en', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title.en'
    }
  }
}
