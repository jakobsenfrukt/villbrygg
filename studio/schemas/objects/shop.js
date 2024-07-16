export default {
  title: 'Location',
  name: 'shop',
  type: 'object',
  fields: [
    {
      name: 'category',
      type: 'reference',
      to: [
        {type: 'shopsCategory'}
      ]
    },
    {
      name: 'name',
      type: 'localeString',
      title: 'Name'
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
  ],
  preview: {
    select: {
      title: 'name.en'
    }
  }
}
