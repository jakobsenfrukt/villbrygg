export default {
  name: 'shopsCountry',
  type: 'document',
  title: 'Country',
  fields: [
    {
      name: 'name',
      type: 'localeString',
      title: 'Country name',
      validation: Rule => Rule.required(),
    },
  ],
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [
        {field: 'name.en', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'name.en'
    }
  }
}
