export default {
  name: 'pageHeader',
  type: 'object',
  title: 'Page header',
  fields: [
    {
      name: 'heading',
      type: 'localeString',
      title: 'Heading'
    },
    {
      name: 'subheading',
      type: 'localeString',
      title: 'Sub heading'
    },
    {
      name: 'text',
      type: 'localeText',
      title: 'Text'
    },
    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [{
        type: 'localeFigure'
      }],
      validation: Rule => Rule.max(2)
    }
  ]
}
