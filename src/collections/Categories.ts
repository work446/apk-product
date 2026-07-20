import type { CollectionConfig } from 'payload'
import { Hero } from '../blocks/Hero'
import { ExploreProducts } from '../blocks/ExploreProducts/config'
import { TechnicalSupport } from '../blocks/TechnicalSupport/config'
import { WidelyUsed } from '../blocks/WidelyUsed/config'
import { StatisticsBlock } from '../blocks/Statistics/config'
import { CallToActionBlock } from '../blocks/CallToAction/config'
import { CategoryHeader } from '../blocks/CategoryHeader/config'
import { revalidateCategory, revalidateCategoryDelete } from '../hooks/revalidateCategory'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [revalidateCategory],
    afterDelete: [revalidateCategoryDelete],
  },
  access: {
    read: () => true,
  },
  defaultSort: 'order',
  fields: [
    {
      name: 'order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Set a number to define the display order (lower numbers appear first).',
      },
    },
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
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: {
        description: 'Short description of the category to show at the top of the product listing.',
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [CategoryHeader, Hero, ExploreProducts, TechnicalSupport, WidelyUsed, StatisticsBlock, CallToActionBlock],
      admin: {
        description: 'Add blocks that will appear above the products list for this category.',
      },
    },
  ],
}
