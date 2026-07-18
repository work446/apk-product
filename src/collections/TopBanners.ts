import type { CollectionConfig } from 'payload'

export const TopBanners: CollectionConfig = {
  slug: 'top-banners',
  admin: {
    useAsTitle: 'internalName',
  },
  access: {
    read: () => true, // Publicly readable so frontend can fetch it
  },
  fields: [
    {
      name: 'internalName',
      type: 'text',
      required: true,
      label: 'Internal Name (e.g., Summer Promo)',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: false,
      label: 'Set as Active Banner',
    },
    {
      name: 'leftIcon',
      type: 'upload',
      relationTo: 'media',
      label: 'Left Icon (Optional Media)',
    },
    {
      name: 'centerIcon',
      type: 'upload',
      relationTo: 'media',
      label: 'Center Icon (Optional Media)',
    },
    {
      name: 'rightIcon',
      type: 'upload',
      relationTo: 'media',
      label: 'Right Icon (Optional Media)',
    },
    {
      name: 'leftText',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'Proudly Manufactured in Vietnam',
    },
    {
      name: 'centerText',
      type: 'text',
      localized: true,
      required: true,
      defaultValue: 'Quality is Our Brand',
    },
    {
      name: 'phoneNumber',
      type: 'text',
      required: true,
      defaultValue: '+84 123 456 789',
    },
  ],
}
