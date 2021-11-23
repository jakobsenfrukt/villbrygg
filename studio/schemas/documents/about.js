export default {
  name: 'about',
  type: 'document',
  title: 'About',
  localize: true,
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'], 
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title'
    },
    {
      name: 'lead',
      type: 'text',
      title: 'Lead'
    },
  ]
}
