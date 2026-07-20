import type { CollectionConfig } from 'payload'

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'productTitle',
  },
  access: {
    read: () => true,
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Set a number to define the display order (lower numbers appear first).',
      },
    },
    {
      name: 'productName',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal product name/model (e.g. APK.SC)',
      },
    },
    {
      name: 'productTitle',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Display title of the product (e.g. Emergency Light)',
      },
    },
    {
      name: 'company',
      type: 'text',
      required: true,
      admin: {
        description: 'Company/Brand slug (e.g. apk-exit-and-emergency-light)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Short product description displayed on the single product page under the title.',
      },
    },
    {
      name: 'badges',
      type: 'array',
      localized: true,
      admin: {
        description: 'Optional badges (e.g. "2 YEAR WARRANTY", "TCVN CERTIFIED").',
      },
      fields: [
        {
          name: 'badgeText',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: false,
    },
    {
      name: 'cardFeatures',
      type: 'relationship',
      relationTo: 'features',
      hasMany: true,
      maxDepth: 1,
      admin: {
        description: 'Select up to 6 key features to display on the product card/page.',
      },
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'imageAlt',
      type: 'text',
      localized: true,
    },
    {
      name: 'characteristics',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'characteristic',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'specifications',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'key',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'downloads',
      type: 'group',
      fields: [
        {
          name: 'catalogue',
          type: 'text',
        },
        {
          name: 'manual',
          type: 'text',
        },
        {
          name: 'certificate',
          type: 'text',
        },
      ],
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      admin: {
        description: 'YouTube video URL for the product',
      },
    },
  ],
}
