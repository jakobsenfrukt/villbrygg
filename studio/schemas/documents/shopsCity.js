export default {
  name: 'shopsCity',
  type: 'document',
  title: 'City',
  fields: [
    {
      name: 'country',
      type: 'reference',
      to: [
        {type: 'shopsCountry'}
      ],
      validation: Rule => Rule.required(),
    },
    {
      name: 'name',
      type: 'localeString',
      title: 'City name',
      validation: Rule => Rule.required(),
    }
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
