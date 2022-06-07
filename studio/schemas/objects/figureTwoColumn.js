export default {
  name: 'figureTwoColumn',
  type: 'object',
  title: 'Images (2 columns)',
  fields: [
    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [{
        type: 'figure'
      }],
      validation: Rule => Rule.max(2)
    }
  ],
  preview: {
    select: {
      image: 'images[0]',
      alt1: 'images[0].alt',
      alt2: 'images[1].alt'
    },
    prepare(selection) {
      const {image, alt1, alt2} = selection
      return {
        title: `Images (2 columns): ${alt1} + ${alt2}`,
        media: image
      }
    }
  }
}
