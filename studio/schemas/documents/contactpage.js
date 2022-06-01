export default {
  name: 'contactpage',
  type: 'document',
  title: 'Contact page',
  //__experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'], 
  fields: [
    {
      name: 'team',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'person' }]
      }]
    },
  ]
}
