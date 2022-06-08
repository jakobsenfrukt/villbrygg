export default {
  name: 'reseller',
  type: 'document',
  title: 'Become a reseller',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'], 
  fields: [
    {
      name: 'pageHeader',
      type: 'pageHeader'
    },
    {
      name: 'body',
      type: 'localeBody', 
      title: 'Body'
    },
    {
      name: 'pageContent',
      type: 'localePageContent', 
      title: 'Additional content'
    }
  ]
}
