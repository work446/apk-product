import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import imagekitPlugin from 'payloadcms-plugin-imagekit'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Navbar } from './globals/Navbar'
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
  collections: [Users, Media],
  globals: [Navbar],
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
    ((imagekitPlugin as any).default || imagekitPlugin)({
      config: {
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY || 'your_public_api_key',
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY || 'your_private_api_key',
        endpoint: process.env.IMAGEKIT_ENDPOINT || 'https://ik.imagekit.io/your_imagekit_id/',
      },
      collections: {
        media: {
          uploadOption: {
            folder: 'some folder',
            extensions: [
              {
                name: 'aws-auto-tagging',
                minConfidence: 80,
                maxTags: 10,
              },
              {
                name: 'google-auto-tagging',
                minConfidence: 70,
                maxTags: 10,
              },
            ],
          },
          savedProperties: ['url', 'AITags'],
        },
      },
    }),
  ],
  async onInit(payload) {
    // Keeps payload.config.ts clean!
    await seedDatabase(payload)
  },
})
