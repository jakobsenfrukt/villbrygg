export default {
  name: 'imageGallery',
  type: 'object',
  title: 'Image gallery',
  fields: [
    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [{
        type: 'figure'
      }],
    }
  ],
  preview: {
    select: {
      image: 'images[0]'
    },
    prepare(selection) {
      const {image, alt1, alt2} = selection
      return {
        title: `Image gallery`,
        media: image
      }
    }
  }
}
