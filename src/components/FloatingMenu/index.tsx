import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { FloatingMenuClient } from './FloatingMenuClient'

export const FloatingMenu = async ({ locale = 'en' }: { locale?: 'en' | 'vi' }) => {
  const payload = await getPayload({ config: configPromise })

  const menuData = await payload.findGlobal({
    slug: 'floating-menu',
    locale,
  })

  // If no menu items exist, render nothing (or fallback).
  if (!menuData || !menuData.menuItems || menuData.menuItems.length === 0) {
    return null
  }

  return <FloatingMenuClient menuItems={menuData.menuItems} />
}
