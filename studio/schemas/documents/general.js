export default {
  name: 'general',
  type: 'document',
  title: 'General',
  __experimental_actions: [/*'create',*/ 'update', /*'delete',*/ 'publish'], 
  fields: [
    {
      name: 'contact',
      type: 'contact',
      title: 'Contact'
    },
    {
      name: 'newsletter',
      type: 'newsletter',
      title: 'Newsletter'
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'Sharing & SEO'
    }
  ]
}
