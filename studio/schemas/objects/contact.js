export default {
  name: 'contact',
  type: 'object',
  title: 'Contact',
  fields: [
    {
      name: 'email',
      type: 'string',
      title: 'E-mail'
    },
    {
      name: 'instagram',
      type: 'string',
      title: 'Instagram'
    },
    {
      name: 'facebook',
      type: 'string',
      title: 'Facebook'
    },
    {
      name: 'address',
      title: 'Address',
      type: 'simpleBody'
    }
  ]
}
