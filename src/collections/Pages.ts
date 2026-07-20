import type { CollectionConfig } from 'payload'
import { Hero } from '../blocks/Hero'

import { ExploreProducts } from '../blocks/ExploreProducts/config'
import { TechnicalSupport } from '../blocks/TechnicalSupport/config'
import { WidelyUsed } from '../blocks/WidelyUsed/config'
import { StatisticsBlock } from '../blocks/Statistics/config'
import { CallToActionBlock } from '../blocks/CallToAction/config'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 375,
      },
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      required: true,
      blocks: [
        Hero,
        ExploreProducts,
        TechnicalSupport,
        WidelyUsed,
        StatisticsBlock,
        CallToActionBlock,
      ],
    },
  ],
}
