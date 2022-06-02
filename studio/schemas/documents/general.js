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
      name: 'newsletterUrl',
      type: 'string',
      title: 'Newsletter URL',
      description: 'The URL to signing up for the newsletter. Remember to add the entire URL, including https:// etc.'
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'Sharing & SEO'
    }
  ]
}
