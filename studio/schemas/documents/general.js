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
      name: 'investUrl',
      type: 'string',
      title: 'Invest URL',
      description: 'The URL to invest, if currently applicable. If this field has an URL, the link to invest will show up in the main menu. Leave empty to hide.'
    },
    {
      name: 'newsletterUrl',
      type: 'string',
      title: 'Newsletter URL',
      description: 'The URL to signing up for the newsletter. Remember to add the entire URL, including https:// etc. Leave empty to hide.'
    },
    {
      name: 'cursorColor',
      type: 'color',
      title: 'Cursor color'
    },
    {
      name: 'seo',
      type: 'seo',
      title: 'Sharing & SEO'
    }
  ]
}
