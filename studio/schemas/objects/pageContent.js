export default {
  name: 'pageContent',
  type: 'object',
  title: 'Page content',
  fields: [
    {
      name: 'blocks',
      type: 'array',
      title: 'Content blocks',
      of: [
        {
          name: 'bodyBlock',
          type: 'bodyBlock',
          title: 'Body text'
        },
        {
          name: 'textBlock',
          type: 'textBlock',
          title: 'Large text (full width)'
        },
        {
          name: 'figure',
          type: 'figure',
          title: 'Image (full width)'
        },
        {
          name: 'imageAndText',
          type: 'imageAndText',
        },
        {
          name: 'figureTwoColumn',
          type: 'figureTwoColumn'
        },
        {
          name: 'imageGallery',
          type: 'imageGallery'
        },
      ]
    }
  ]
}
