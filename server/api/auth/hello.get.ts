import { prisma } from '~~/server/database'

export default defineEventHandler(async() => {
    const godparents = await prisma.godparents.findMany()
    return { success: true, godparents: [...godparents]}
})