import type { CollectionConfig } from 'payload'

export const Features: CollectionConfig = {
  slug: 'features',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'The main feature text (e.g. "High Brightness" or "2x 1.5W LED").',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        description: 'Optional secondary text (e.g. "Powerful LED" or "Up to 3 Hours").',
      },
    },
    {
      name: 'icon',
      type: 'select',
      required: false,
      admin: {
        description: 'Select a default icon to represent this feature.',
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
  ],
}
