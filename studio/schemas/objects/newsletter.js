export default {
  name: 'newsletter',
  type: 'object',
  title: 'Newsletter',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Heading'
    },
    {
      name: 'text',
      type: 'text',
      title: 'Text'
    },
    {
      name: 'placeholder',
      type: 'string',
      title: 'Placeholder'
    },
    {
      name: 'button',
      type: 'string',
      title: 'Button'
    },
    {
      name: 'disclaimer',
      type: 'simpleText',
      title: 'Disclaimer'
    }
  ]
}
