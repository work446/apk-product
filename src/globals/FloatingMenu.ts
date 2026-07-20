import type { GlobalConfig } from 'payload'
import { revalidateGlobal } from '../hooks/revalidateGlobal'

export const FloatingMenu: GlobalConfig = {
  slug: 'floating-menu',
  hooks: {
    afterChange: [revalidateGlobal],
  },
  access: {
    read: () => true,
  },
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'menuItems',
      type: 'array',
      fields: [
        {
          name: 'icon',
          type: 'select',
          options: [
            { label: 'Zalo', value: 'zalo' },
            { label: 'Phone', value: 'phone' },
            { label: 'Messenger', value: 'messenger' },
            { label: 'Mail', value: 'mail' },
          ],
          required: true,
        },
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
        {
          name: 'color',
          type: 'text',
          admin: {
            description: 'Optional hex color for the icon background (e.g. #0068ff for Zalo). Leave blank for default red.',
          },
        },
      ],
    },
  ],
}
