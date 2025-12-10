// scripts/check-prisma.ts
import { prisma } from '~~/server/database';

async function main() {
  try {
    await prisma.$connect()
    console.log("✅ Prisma connected successfully")
    const count = await prisma.godparents.count()
    console.log("User count:", count)
  } catch (err) {
    console.error("❌ Prisma connection failed:", err)
  } finally {
    await prisma.$disconnect()
  }
}

main()
