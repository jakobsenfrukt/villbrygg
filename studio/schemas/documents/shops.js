export default {
  name: 'shops',
  type: 'document',
  title: 'Shops',
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
    }
  ]
}
