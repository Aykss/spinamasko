import { prisma } from "../lib/prisma";

async function main() {
  // Create a new user with a post
  const user = await prisma.godparents.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      unique_id: 'nano1234',
      password: 'alice123'
    }
  })
  console.log('Created Godparent:', user)

  // Fetch all users with their posts
  const allUsers = await prisma.godparents.findMany()
  console.log('All users:', JSON.stringify(allUsers, null, 2))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })