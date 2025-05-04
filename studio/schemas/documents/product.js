export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'category',
      type: 'reference',
      to: [
        {type: 'productCategory'}
      ],
      validation: Rule => Rule.required(),
    },
    {
      name: 'intro',
      type: 'localeString',
      title: 'Front page intro',
      description: 'Short text that shows up on hover. (Note: Not displayed on touch devices.)',
      validation: Rule => Rule.required(),
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'localeFigure',
      validation: Rule => Rule.required(),
    },
    {
      name: 'detailImage',
      title: 'Detail image',
      type: 'localeFigure'
    },
    {
      name: 'detailImages',
      title: 'Detail images',
      type: 'array',
      of: [
        {
          name: 'localeFigure',
          title: 'Image',
          type: 'localeFigure'
        },
      ]
    },
    {
      name: 'lead',
      type: 'localeText',
      title: 'Lead',
      validation: Rule => Rule.required(),
    },
    {
      name: 'info',
      type: 'array',
      title: 'Product info tabs',
      of: [{
        type: 'productInfo'
      }],
      validation: Rule => Rule.required(),
    },
    {
      name: 'body',
      title: 'Body (NOT IN USE)',
      type: 'localeBody',
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
}
