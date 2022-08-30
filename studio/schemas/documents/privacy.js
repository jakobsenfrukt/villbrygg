export default {
  name: 'privacy',
  type: 'document',
  title: 'Privacy policy',
  //__experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'], 
  fields: [
    {
      name: 'pageHeader',
      type: 'pageHeader'
    },
    {
      name: 'body',
      type: 'localeBody', 
      title: 'Body'
    }
  ]
}
