import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    disableLocalStorage: true,
    adminThumbnail: ({ doc }) => (doc.imagekit as any)?.thumbnailUrl || (doc.imagekit as any)?.url || doc.url,
  },
  hooks: {
    beforeOperation: [
      async ({ args, operation }) => {
        if ((operation === 'create' || operation === 'update') && args.req?.file?.data) {
          const file = args.req.file
          if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
            const sharp = (await import('sharp')).default
            const webpBuffer = await sharp(file.data)
              .webp({ quality: 80 })
              .toBuffer()

            args.req.file.data = webpBuffer
            args.req.file.mimetype = 'image/webp'
            args.req.file.name = file.name.replace(/\.(png|jpg|jpeg)$/i, '.webp')
            args.req.file.size = webpBuffer.length
          }
        }
        return args
      },
    ],
  },
}
