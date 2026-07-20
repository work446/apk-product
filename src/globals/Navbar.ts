import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '../hooks/revalidateGlobal'

export const Navbar: GlobalConfig = {
  slug: 'navbar',
  hooks: {
    afterChange: [revalidateGlobal],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'ctaText',
      type: 'text',
      required: false,
      defaultValue: 'SEE PRODUCTS',
      localized: true,
    },
    {
      name: 'ctaUrl',
      type: 'text',
      required: false,
      defaultValue: '/products',
    },
    {
      name: 'links',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
