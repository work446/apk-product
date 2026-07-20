import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../payload.config'
import fs from 'fs'
import path from 'path'

const enData = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'apk_en.json'), 'utf8'))
const viData = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'apk_vi.json'), 'utf8'))

const IMAGES_DIR = path.resolve(process.cwd(), 'images')

async function run() {
  const payload = await getPayload({ config: configPromise })
  
  // 1. Extract Categories
  console.log('Extracting categories...')
  const categoriesMap = new Map()
  
  for (let i = 0; i < enData.products.length; i++) {
    const enCat = enData.products[i].category
    const viCat = viData.products[i]?.category || enCat
    
    if (!categoriesMap.has(enCat)) {
      const slug = enCat.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      
      const existing = await payload.find({
        collection: 'categories',
        where: { slug: { equals: slug } },
      })
      
      let catId
      if (existing.totalDocs > 0) {
        catId = existing.docs[0].id
      } else {
        const created = await payload.create({
          collection: 'categories',
          data: {
            slug,
            title: enCat,
          },
        })
        catId = created.id
        
        await payload.update({
          collection: 'categories',
          id: catId,
          data: {
            title: viCat,
          },
          locale: 'vi',
        })
      }
      categoriesMap.set(enCat, catId)
    }
  }
  
  // 2. Import Products
  console.log('Importing products...')
  for (let i = 0; i < enData.products.length; i++) {
    const enProd = enData.products[i]
    const viProd = viData.products[i] || enProd
    
    const imageIds = []
    for (const url of enProd['image-url']) {
      const filename = url.split('/').pop()
      const localPath = path.join(IMAGES_DIR, filename)
      
      if (fs.existsSync(localPath)) {
        const fileData = fs.readFileSync(localPath)
        const size = fs.statSync(localPath).size
        const createdMedia = await payload.create({
          collection: 'media',
          data: {
            alt: enProd['image-alt'] || enProd['product-title'],
          },
          file: {
            data: fileData,
            mimetype: 'image/png',
            name: filename,
            size,
          }
        })
        imageIds.push({ image: createdMedia.id })
      } else {
        console.warn(`Local image not found: ${localPath}, skipping image.`)
      }
    }
    
    const mapCharacteristics = (chars: string[]) => chars.map(c => ({ characteristic: c }))
    const mapSpecs = (specs: Record<string, string>) => Object.entries(specs).map(([k, v]) => ({ key: k, value: v }))
    
    const createdProduct = await payload.create({
      collection: 'products',
      data: {
        productName: enProd['product-name'],
        productTitle: enProd['product-title'],
        company: enProd.company,
        category: categoriesMap.get(enProd.category),
        images: imageIds,
        imageAlt: enProd['image-alt'],
        characteristics: enProd.characteristics ? mapCharacteristics(enProd.characteristics) : [],
        specifications: enProd.specifications ? mapSpecs(enProd.specifications) : [],
      },
    })
    
    await payload.update({
      collection: 'products',
      id: createdProduct.id,
      locale: 'vi',
      data: {
        productTitle: viProd['product-title'],
        imageAlt: viProd['image-alt'],
        characteristics: viProd.characteristics ? mapCharacteristics(viProd.characteristics) : [],
        specifications: viProd.specifications ? mapSpecs(viProd.specifications) : [],
      }
    })
    
    console.log(`Imported ${enProd['product-name']}`)
  }
  
  console.log('Import complete!')
  process.exit(0)
}

run().catch(console.error)
