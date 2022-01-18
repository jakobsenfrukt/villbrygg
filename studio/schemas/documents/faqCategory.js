export default {
  name: 'faqCategory',
  type: 'document',
  title: 'FAQ Category',
  fields: [
    {
      name: 'title',
      type: 'localeString',
      title: 'Category title'
    }
  ],
  preview: {
    select: {
      title: 'title.en'
    }
  }
}
