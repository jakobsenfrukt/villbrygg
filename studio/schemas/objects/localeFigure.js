export default {
  name: 'localeFigure',
  type: 'image',
  title: 'Image',
  options: {
    hotspot: true
  },
  fields: [
    {
      name: 'alt',
      type: 'localeString',
      title: 'Alternative text',
      description: 'Important for SEO and accessiblity. Briefly describe what is shown in the image as if to a blind person.',
      options: {
        isHighlighted: true
      },
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'alt.en'
    }
  }
}
