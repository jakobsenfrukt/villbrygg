export default {
  name: 'article',
  type: 'document',
  title: 'Article',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      title: 'Language',
      name: 'locale',
      type: 'string',
      options: {
        list: [
          {title: 'Norwegian', value: 'no'},
          {title: 'English', value: 'en'}
        ], // <-- predefined values
        layout: 'radio' // <-- defaults to 'dropdown'
      }
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'mainImages',
      title: 'Main images',
      type: 'array',
      of: [{
        type: 'figure'
      }],
      validation: Rule => Rule.max(2)
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
      media: 'mainImage'
    }
  }
}
