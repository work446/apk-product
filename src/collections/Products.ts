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
      name: 'badge',
      type: 'text',
      localized: true,
      admin: {
        description: 'Optional badge text (e.g. "1 YEAR WARRANTY", "NEW"). Displays on the top right of the product image.',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: false,
    },
    {
      name: 'cardFeatures',
      type: 'array',
      localized: true,
      maxRows: 3,
      admin: {
        description: 'Up to 3 key features to display on the product card (e.g. 2x 1.5W LED, Up to 3 Hours).',
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: false,
          admin: {
            description: 'Select a default icon.',
          },
          options: [
            { label: 'Lightbulb', value: 'Lightbulb' },
            { label: 'Clock', value: 'Clock' },
            { label: 'Shield', value: 'Shield' },
            { label: 'Battery', value: 'Battery' },
            { label: 'Zap', value: 'Zap' },
            { label: 'Droplet', value: 'Droplet' },
            { label: 'Thermometer', value: 'Thermometer' },
            { label: 'Check', value: 'Check' },
            { label: 'Star', value: 'Star' },
          ],
        },
        {
          name: 'customIcon',
          type: 'upload',
          relationTo: 'media',
          required: false,
          admin: {
            description: 'Optional: Upload a custom icon (SVG/PNG) to override the default selected icon.',
          },
        },
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
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
