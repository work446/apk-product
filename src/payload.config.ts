import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'


import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { TopBanners } from './collections/TopBanners'
import { Products } from './collections/Products'
import { Categories } from './collections/Categories'
import { Navbar } from './globals/Navbar'
import { Footer } from './globals/Footer'
import { FloatingMenu } from './globals/FloatingMenu'
import { seedDatabase } from './scripts/seed'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Pages, TopBanners, Products, Categories],
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
    ...(process.argv.includes('generate:types')
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
  ],
  async onInit(payload) {
    // Keeps payload.config.ts clean!
    await seedDatabase(payload)
  },
})
