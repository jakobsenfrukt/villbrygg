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
      validation: Rule => Rule.required(),
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
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: Rule => Rule.required(),
    },
    {
      name: 'categories',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'articlesCategory' }]
      }]
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
    },
    {
      name: 'body',
      type: 'body', 
      title: 'Main text'
    },
    {
      name: 'pageContent',
      type: 'pageContent', 
      title: 'Additional content'
    },
    {
      title: 'Related articles',
      name: 'related',
      type: 'array',
      of: [
        {
          title: 'Article',
          type: 'reference',
          to: [
            {
              type: 'article'
            }
          ]
        }
      ]
    },
  ],
  orderings: [
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [
        {field: 'title', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'title',
      mediaArray: 'mainImages'
    },
    prepare(selection) {
      const { title, mediaArray } = selection;
      return {
        title,
        media: mediaArray && mediaArray[0]
      };
    }
  }
}
