export default {
  name: 'faq',
  type: 'document',
  title: 'FAQ',
  localize: true,
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'], 
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'intro',
      type: 'simpleText',
      title: 'Intro'
    }
  ]
}
