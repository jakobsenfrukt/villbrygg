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
      ]
    },
    {
      name: 'name',
      type: 'localeString',
      title: 'City name'
    },
    {
      name: 'shops',
      type: 'array',
      title: 'Locations',
      of: [{
        type: 'shop'
      }]
    }
  ],
  preview: {
    select: {
      title: 'name.en'
    }
  }
}
