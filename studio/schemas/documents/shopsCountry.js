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
  preview: {
    select: {
      title: 'name.en'
    }
  }
}
