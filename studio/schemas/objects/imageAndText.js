export default {
  name: 'imageAndText',
  type: 'object',
  title: 'Image and text',
  fields: [
    {
      name: 'image',
      type: 'figure',
      title: 'Image'
    },
    {
      name: 'text',
      type: 'text',
      title: 'Text'
    }
  ],
  preview: {
    select: {
      image: 'image',
      text: 'text',
    },
    prepare(selection) {
      const {image, text} = selection
      return {
        title: `Image and text: "${text}"`,
        media: image
      }
    }
  }
}
