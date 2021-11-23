export default {
  name: 'seo',
  type: 'object',
  title: 'Sharing & SEO',
  fields: [
    {
      name: 'ogimg',
      type: 'image',
      title: 'Social media thumbnail',
      description: 'Shows up when sharing the website on social media if no other image is available.',
      validation: Rule => Rule.error('Missing social media thumbnail!').required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      description: 'Describe your site for search engines and social media.'
    }
  ]
}
