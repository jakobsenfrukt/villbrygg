import { baseLanguage } from '../languages'

export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  localize: true,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      localize: false,
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      localize: false,
      options: {
        source: `title.${baseLanguage.name}`,
        maxLength: 96,
      },
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'figure'
    },
    {
      name: 'lead',
      type: 'text',
      title: 'Lead'
    },
    {
      name: 'body',
      title: 'Body',
      type: 'body',
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
}
