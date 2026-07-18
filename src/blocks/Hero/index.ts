import type { Block } from 'payload'

export const Hero: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  fields: [
    {
      name: 'tagline',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      type: 'row',
      fields: [
        {
          name: 'headlineBlack',
          type: 'text',
          localized: true,
          required: true,
        },
        {
          name: 'headlineRed',
          type: 'text',
          localized: true,
          required: true,
        },
      ],
    },
    {
      name: 'subtitle',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'features',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      localized: true,
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: ['Shield', 'Tag', 'Wrench'], // Basic lucide-react icon names
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'actions',
      type: 'array',
      maxRows: 3,
      localized: true,
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
        {
          name: 'style',
          type: 'select',
          options: [
            { label: 'Primary (Solid Red)', value: 'primary' },
            { label: 'Secondary (Outline Red)', value: 'secondary' },
            { label: 'Ghost (Play Icon)', value: 'ghost' },
          ],
          required: true,
        },
      ],
    },
    {
      name: 'sliderImages',
      type: 'array',
      label: 'Slider Images',
      maxRows: 5,
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
      name: 'trustBanner',
      type: 'array',
      localized: true,
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: ['ShieldCheck', 'Truck', 'Package', 'Award', 'Headset'],
          required: true,
        },
        {
          name: 'text',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
