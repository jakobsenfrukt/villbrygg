export default {
  name: 'faq',
  type: 'document',
  title: 'FAQ',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'], 
  fields: [
    {
      name: 'title',
      type: 'localeString',
      title: 'Title'
    },
    {
      name: 'intro',
      type: 'localeText',
      title: 'Intro'
    }
  ]
}
