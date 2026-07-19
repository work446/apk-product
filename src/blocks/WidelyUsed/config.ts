import type { Block } from 'payload'

export const WidelyUsed: Block = {
  slug: 'widelyUsed',
  interfaceName: 'WidelyUsedBlock',
  labels: {
    singular: 'Widely Used',
    plural: 'Widely Used Blocks',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      defaultValue: 'WIDELY USED IN',
      localized: true,
    },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Factory (Factories)', value: 'Factory' },
            { label: 'Building (Offices)', value: 'Building2' },
            { label: 'School (Schools)', value: 'School' },
            { label: 'Hospital (Hospitals)', value: 'HeartPulse' },
            { label: 'Shopping Bag (Malls)', value: 'ShoppingBag' },
            { label: 'Apartment (Home)', value: 'Home' },
            { label: 'Storefront', value: 'Store' },
            { label: 'Warehouse', value: 'Warehouse' },
          ],
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
      ],
    },
  ],
}
