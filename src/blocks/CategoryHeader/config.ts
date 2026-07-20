import type { Block } from 'payload'

export const CategoryHeader: Block = {
  slug: 'categoryHeader',
  interfaceName: 'CategoryHeaderBlock',
  labels: {
    singular: 'Category Header',
    plural: 'Category Headers',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
  ],
}
