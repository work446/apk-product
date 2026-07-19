import type { Block } from 'payload'

export const ExploreProducts: Block = {
  slug: 'exploreProducts',
  interfaceName: 'ExploreProductsBlock',
  labels: {
    singular: 'Explore Products',
    plural: 'Explore Products',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'EXPLORE APK PRODUCTS',
      localized: true,
    },
    {
      name: 'categories',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'badge',
          type: 'text',
          localized: true,
          admin: {
            description: 'Optional badge text (e.g., 24 months warranty)',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          localized: true,
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          admin: {
            description: 'The URL this category links to (e.g., /products/emergency-lights)',
          },
        },
        {
          name: 'linkText',
          type: 'text',
          required: true,
          defaultValue: 'VIEW MORE',
          localized: true,
        },
      ],
    },
  ],
}
