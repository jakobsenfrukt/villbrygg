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
      name: 'pageHeader',
      type: 'pageHeader'
    },
    {
      name: 'body',
      title: 'Main text',
      type: 'localeBody',
    },
    {
      name: 'pageContent',
      type: 'localePageContent'
    },
    {
      name: 'info',
      title: 'Background info',
      type: 'localeText'
    }
  ]
}
