export default {
  name: 'shopsCategory',
  type: 'document',
  title: 'Location type',
  fields: [
    {
      name: 'title',
      type: 'localeString',
      title: 'Category title'
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
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
