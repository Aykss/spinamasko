import { signupSchema } from "~~/server/utils/zod"
import { prisma } from '~~/lib/prisma'
import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    const parsed = signupSchema.safeParse(body)
    if(!parsed.success){
        throw createError({
        statusCode: 400,
        statusMessage: parsed.error.issues.map(e => e.message).join(', ')
        })
    } else {
        const data = parsed.data
    
        const existing = await prisma.godparents.findFirst({
            where: {
                email: data.email
            }
        })

        if(existing){
            throw createError({
                statusCode: 409,
                statusMessage: "Email is already in use"
            })
        }

        const hashedPassword = await hashPassword(data.password)

        const godparent = await prisma.godparents.create({
            data: {
                ...data,
                password: hashedPassword,
                unique_id: nanoid(8)
            }
        })

        return { success: true, godparent}
    }
})