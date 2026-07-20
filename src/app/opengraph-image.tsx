import { ImageResponse } from 'next/og'
import { join } from 'path'
import { readFile } from 'fs/promises'

export const alt = 'APK Product'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  // Read the transparent logo from the public folder
  const logoData = await readFile(join(process.cwd(), 'public', 'apk-logo-transparent.png'))
  const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
        }}
      >
        <img
          src={logoSrc}
          alt="APK Product"
          style={{ width: '800px', objectFit: 'contain' }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}
