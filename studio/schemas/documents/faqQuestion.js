export default {
  name: 'faqQuestion',
  type: 'document',
  title: 'FAQ Question',
  fields: [
    {
      name: 'category',
      type: 'reference',
      to: [
        {type: 'faqCategory'}
      ]
    },
    {
      name: 'question',
      type: 'localeString',
      title: 'Question'
    },
    {
      name: 'answer',
      type: 'localeText',
      title: 'Answer'
    }
  ],
  preview: {
    select: {
      title: 'question.en'
    }
  }
}
