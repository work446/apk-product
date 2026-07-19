import type { Block } from 'payload'

export const TechnicalSupport: Block = {
  slug: 'technicalSupport',
  interfaceName: 'TechnicalSupportBlock',
  labels: {
    singular: 'Technical Support',
    plural: 'Technical Support',
  },
  fields: [
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      defaultValue: 'STRONG TECHNICAL SUPPORT',
      localized: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: "WE DON'T JUST SELL. WE STAY UNTIL IT WORKS.",
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      defaultValue: 'Our engineers are always ready to support you with professional service and technical expertise.',
      localized: true,
    },
    {
      name: 'features',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'featureText',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
    {
      name: 'linkGroup',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
          required: true,
          defaultValue: 'CONTACT OUR ENGINEERS',
          localized: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          defaultValue: '/contact',
        },
      ],
    },
    {
      name: 'sliderImages',
      type: 'array',
      label: 'Background Images',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'mobileImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description:
              'Optional: Image for screens below 768px. Falls back to the main image if not provided.',
          },
        },
      ],
    },
  ],
}
