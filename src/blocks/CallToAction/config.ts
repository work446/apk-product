import type { Block } from 'payload'

export const CallToActionBlock: Block = {
  slug: 'callToAction',
  labels: {
    singular: 'Call To Action',
    plural: 'Call To Actions',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'buttonText',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'buttonLink',
      type: 'text',
      required: true,
    },
  ],
}
