export default {
  name: 'location',
  type: 'document',
  title: 'Location',
  fields: [
    {
      name: 'category',
      type: 'reference',
      to: [
        {type: 'shopsCategory'}
      ],
      validation: Rule => Rule.required(),
    },
    {
      name: 'city',
      type: 'reference',
      to: [
        {type: 'shopsCity'}
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
      title: 'Website'
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
      title: 'name'
    }
  }
}
