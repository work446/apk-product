import React from 'react'
import { CategoryHeader as OriginalCategoryHeader } from '@/app/(frontend)/[locale]/products/components/CategoryHeader'

export type CategoryHeaderBlockProps = {
  title: string
  description?: string | null
  // We'll pass locale manually if needed or default it
  locale?: string
}

export const CategoryHeaderBlock: React.FC<CategoryHeaderBlockProps & { id?: string }> = ({
  title,
  description,
  locale = 'en',
}) => {
  return (
    <div className="w-full">
      <OriginalCategoryHeader 
        title={title} 
        description={description || undefined} 
        locale={locale} 
      />
    </div>
  )
}
