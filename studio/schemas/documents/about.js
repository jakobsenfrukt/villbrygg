export default {
  name: 'about',
  type: 'document',
  title: 'About',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'], 
  fields: [
    {
      name: 'title',
      type: 'localeString',
      title: 'Title'
    },
    {
      name: 'lead',
      type: 'localeText',
      title: 'Lead'
    }
  ]
}
