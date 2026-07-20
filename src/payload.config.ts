import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { seoPlugin } from '@payloadcms/plugin-seo'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { TopBanners } from './collections/TopBanners'
import { Products } from './collections/Products'
import { Categories } from './collections/Categories'
import { Features } from './collections/Features'
import { Navbar } from './globals/Navbar'
import { Footer } from './globals/Footer'
import { FloatingMenu } from './globals/FloatingMenu'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- APK Product',
      icons: [{ url: '/apk-logo-transparent.png' }],
    },
    components: {
      graphics: {
        Logo: '@/components/BrandLogo#BrandLogo',
        Icon: '@/components/BrandLogo#BrandIcon',
      },
    },
  },
  collections: [Users, Media, Pages, TopBanners, Products, Categories, Features],
  globals: [Navbar, Footer, FloatingMenu],
  localization: {
    locales: ['en', 'vi'],
    defaultLocale: 'en',
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp,
  plugins: [
    ...(process.argv.includes('generate:types') || process.argv.includes('generate:importmap')
      ? []
      : [
          // @ts-ignore
          (await import('payloadcms-plugin-imagekit')).default({
            config: {
              publicKey: process.env.IMAGEKIT_PUBLIC_KEY || 'your_public_api_key',
              privateKey: process.env.IMAGEKIT_PRIVATE_KEY || 'your_private_api_key',
              endpoint: process.env.IMAGEKIT_ENDPOINT || 'https://ik.imagekit.io/your_imagekit_id/',
            },
            collections: {
              media: {
                uploadOption: {
                  folder: 'apk_product_media',
                },
                savedProperties: ['url', 'AITags'],
              },
            },
          }),
        ]),
    seoPlugin({
      collections: ['pages', 'products', 'categories'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => {
        if (doc?.title) return `${doc.title} - APK Product`
        if (doc?.productTitle) return `${doc.productTitle} - APK Product`
        return 'APK Product'
      },
      generateDescription: ({ doc }) => {
        return doc?.description || 'APK Product'
      },
      generateURL: ({ doc, collectionSlug }) => {
        const url = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
        if (collectionSlug === 'pages' && doc?.slug === 'home') {
          return url
        }
        if (collectionSlug === 'pages') {
          return `${url}/${doc?.slug}`
        }
        if (collectionSlug === 'products' && doc?.company) {
          return `${url}/products/${doc.company}`
        }
        if (collectionSlug === 'categories') {
          return `${url}/categories/${doc?.slug}`
        }
        return url
      },
    }),
  ],
})
