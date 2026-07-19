const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const products = await prisma.product.findMany({
    include: { Category: true }
  });
  console.log("Total products:", products.length);
  if (products.length > 0) {
    const cats = new Set(products.map(p => p.Category?.name));
    console.log("Unique Categories linked to products:", Array.from(cats));
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
