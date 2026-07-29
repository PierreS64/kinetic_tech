import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const seedDataPath = path.resolve(__dirname, 'seedData.js');
  let mockDataContent = fs.readFileSync(seedDataPath, 'utf-8');

  const idRegex = /id:\s*'([a-zA-Z0-9-]+)'/g;
  let match;
  
  const productsToSeed = [];
  const idMapping = {};

  // First pass to parse categories (mockData uses CATEGORIES.LAPTOP etc. We can just create them if they don't exist)
  const categoryNames = ['laptop', 'điện thoại', 'gaming gear', 'linh kiện'];
  const categories = {};
  
  for (const name of categoryNames) {
    let cat = await prisma.category.findFirst({ where: { name } });
    if (!cat) {
      cat = await prisma.category.create({ data: { name } });
    }
    categories[name] = cat.id;
  }

  console.log("Categories ready:", categories);

  let modifiedContent = mockDataContent;
  const replacedIds = new Set();
  
  while ((match = idRegex.exec(mockDataContent)) !== null) {
    const oldId = match[1];
    if (oldId.length < 30 && !replacedIds.has(oldId)) {
      const newId = crypto.randomUUID();
      idMapping[oldId] = newId;
      const replaceRegex = new RegExp(`id:\\s*'${oldId}'`, 'g');
      modifiedContent = modifiedContent.replace(replaceRegex, `id: '${newId}'`);
      
      replacedIds.add(oldId);
    }
  }

  fs.writeFileSync(seedDataPath, modifiedContent, 'utf-8');
  console.log('Updated seedData.js with UUIDs.');
  
  

  const mockDataUrl = 'file://' + seedDataPath.replace(/\\/g, '/');
  const { products, builderParts } = await import(mockDataUrl);
  
  // Helper to seed a single product item
  const seedProduct = async (product, categoryName) => {
    let catId = categories[categoryName];
    if (!catId) {
       catId = Object.values(categories)[0];
    }
    
    console.log(`Seeding Product: ${product.name} (${product.id})`);
    const specsObj = { ...product };
    if (typeof product.specs === 'object' && product.specs !== null) {
      Object.assign(specsObj, product.specs);
      delete specsObj.specs;
    }
    delete specsObj.id;
    delete specsObj.name;
    delete specsObj.category;
    delete specsObj.brand;
    delete specsObj.price;
    delete specsObj.oldPrice;
    delete specsObj.image;
    delete specsObj.rating;
    delete specsObj.reviews;
    delete specsObj.tags;
    delete specsObj.featured;
    delete specsObj.inStock;
    const desc = JSON.stringify(specsObj);

    const createdProduct = await prisma.product.upsert({
      where: { id: product.id },
      update: {
        name: product.name,
        categoryId: catId,
        brand: product.brand || 'Unknown',
        description: desc,
      },
      create: {
        id: product.id,
        name: product.name,
        categoryId: catId,
        brand: product.brand || 'Unknown',
        description: desc,
      }
    });

    await prisma.productVariant.upsert({
      where: { id: product.id },
      update: {
        price: product.price,
        stockQuantity: 100, 
      },
      create: {
        id: product.id,
        productId: createdProduct.id,
        price: product.price,
        stockQuantity: 100,
      }
    });
    
    if (product.image) {
      const existingImage = await prisma.productImage.findFirst({
        where: { productId: createdProduct.id, isThumbnail: true }
      });
      
      if (!existingImage) {
        await prisma.productImage.create({
          data: {
            productId: createdProduct.id,
            imageUrl: product.image,
            isThumbnail: true
          }
        });
      }
    }
  };

  for (const product of products) {
    await seedProduct(product, product.category);
  }

  // Seed builder parts
  if (builderParts) {
    for (const [partCategory, partsArray] of Object.entries(builderParts)) {
      for (const part of (partsArray as any[])) {
        // Map partCategory to our categories (they are all 'linh kiện' essentially)
        await seedProduct(part, 'linh kiện');
      }
    }
  }

  console.log('Database seeded successfully.');
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
