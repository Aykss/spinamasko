import { signupSchema } from "~~/server/utils/zod"
import { prisma } from '~~/lib/prisma'
import { nanoid } from 'nanoid'

export default defineEventHandler(async (event) => {
    const result = await readValidatedBody(event, body => signupSchema.safeParse(body))

    if(!result.success){
        throw createError({
        statusCode: 400,
        statusMessage: result.error.issues.map(e => e.message).join(', ')
        })
    } 

    const data = result.data
    
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

    const hashedPassword = await getHashedPassword(data.password)

    const godparent = await prisma.godparents.create({
        data: {
            ...data,
            password: hashedPassword,
            unique_id: nanoid(8)
        }
    })

    return { success: true, godparent}
})