export default {
  name: 'shopsCountry',
  type: 'document',
  title: 'Country',
  fields: [
    {
      name: 'name',
      type: 'localeString',
      title: 'Country name'
    },
    {
      name: 'online',
      type: 'array',
      title: 'Online shops',
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
