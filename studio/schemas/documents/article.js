import { i18n } from '../documentTranslation'

export default {
  name: 'article',
  type: 'document',
  title: 'Article',
  i18n, // Enables document level translations
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
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
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage.image'
    }
  }
}
