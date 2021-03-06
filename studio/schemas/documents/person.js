export default {
  name: 'person',
  type: 'document',
  title: 'Person',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'localeFigure'
    },
    {
      name: 'title',
      type: 'localeString',
      title: 'Title'
    },
    {
      name: 'email',
      type: 'string',
      title: 'E-mail'
    }
  ],
  orderings: [
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [
        {field: 'name.en', direction: 'asc'}
      ]
    }
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image'
    }
  }
}
