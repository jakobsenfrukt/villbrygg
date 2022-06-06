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
      title: 'Body',
      type: 'localeBody',
    },
    {
      name: 'info',
      title: 'Background info',
      type: 'localeText'
    }
  ]
}
