export default {
  name: 'onlineShop',
  type: 'document',
  title: 'Online Shop',
  fields: [
    {
      name: 'category',
      type: 'reference',
      to: [
        {type: 'shopsCategory'}
      ]
    },
    {
      title: 'Countries',
      name: 'countries',
      type: 'array',
      of: [
        {
          title: 'Country',
          type: 'reference',
          to: [
            {
              type: 'shopsCountry'
            }
          ]
        }
      ],
      validation: Rule => Rule.required(),
    },
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: Rule => Rule.required(),
    },
    {
      name: 'website',
      type: 'string',
      title: 'Website',
      validation: Rule => Rule.required(),
    },
    {
      name: 'text',
      type: 'localeSimpleBody',
      title: 'Text'
    },
  ],
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [
        {field: 'name', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'website'
    }
  }
}
