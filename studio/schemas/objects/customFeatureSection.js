export default {
  name: 'customFeatureSection',
  type: 'object',
  title: 'Custom feature section',
  fields: [
    {
      name: "show",
      type: "boolean",
      title: "Show custom feature section"
    },
    {
      name: 'heading',
      type: 'localeSimpleBody',
      title: 'Heading'
    },
    {
      name: 'text',
      type: 'localeText',
      title: 'Text'
    },
    {
      name: 'linkUrl',
      type: 'localeString',
      title: 'Link URL',
      description: 'Paste the full URL, including https:// etc.'
    },
    {
      name: 'linkText',
      type: 'localeString',
      title: 'Link text'
    }
  ]
}