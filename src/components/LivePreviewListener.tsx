'use client'

import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation.js'
import React from 'react'

export const LivePreviewListener: React.FC = () => {
  const router = useRouter()
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  console.log('[LivePreview] mounted, serverURL:', serverURL)

  return (
    <PayloadLivePreview
      refresh={() => {
        console.log('[LivePreview] refresh triggered')
        router.refresh()
      }}
      serverURL={serverURL}
    />
  )
}
