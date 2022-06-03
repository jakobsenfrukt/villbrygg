export default {
  name: 'faqCategory',
  type: 'document',
  title: 'FAQ Category',
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
