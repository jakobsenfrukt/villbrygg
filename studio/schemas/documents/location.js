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
      name: 'text',
      type: 'localeSimpleBody',
      title: 'Text'
    },
    {
      name: 'url',
      type: 'string',
      title: 'URL',
      description: 'Hele URL-en til kunden, inkludert https://',
    },
    {
      name: 'rawData',
      type: 'string',
      title: 'Raw data from sheet integration',
      hidden: true
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
