export default {
  name: 'contactpage',
  type: 'document',
  title: 'Contact page',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'], 
  fields: [
    {
      name: 'pageHeader',
      type: 'pageHeader'
    },
    {
      name: 'body',
      type: 'localeBody', 
      title: 'Main text'
    },
    {
      name: 'team',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'person' }]
      }]
    },
    {
      name: 'generalHeading',
      type: 'localeText', 
      title: 'General contact heading'
    },
    {
      name: 'generalLabel',
      type: 'localeString', 
      title: 'General contact label'
    },
    {
      name: 'email',
      type: 'string', 
      title: 'Email'
    },
    {
      name: 'phone',
      type: 'string', 
      title: 'Phone'
    }
  ]
}
