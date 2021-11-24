export default {
  name: 'newsletter',
  type: 'object',
  title: 'Newsletter',
  fields: [
    {
      name: 'heading',
      type: 'localeString',
      title: 'Heading'
    },
    {
      name: 'text',
      type: 'localeText',
      title: 'Text'
    },
    {
      name: 'placeholder',
      type: 'localeString',
      title: 'Placeholder'
    },
    {
      name: 'button',
      type: 'localeString',
      title: 'Button'
    },
    {
      name: 'disclaimer',
      type: 'localeText',
      title: 'Disclaimer'
    }
  ]
}
