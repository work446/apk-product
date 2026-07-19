import type { Block } from 'payload'

export const StatisticsBlock: Block = {
  slug: 'statistics',
  labels: {
    singular: 'Statistics',
    plural: 'Statistics',
  },
  fields: [
    {
      name: 'stats',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Building', value: 'building' },
            { label: 'Users', value: 'users' },
            { label: 'Handshake', value: 'handshake' },
            { label: 'Thumbs Up', value: 'thumbs-up' },
          ],
        },
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: {
            description: 'E.g., 15+, 500+, 98%',
          },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
          admin: {
            description: 'E.g., YEARS EXPERIENCE',
          },
        },
      ],
    },
  ],
}
