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
      ]
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'localeFigure'
    },
    {
      name: 'lead',
      type: 'localeText',
      title: 'Lead'
    },
    {
      name: 'body',
      title: 'Body',
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
