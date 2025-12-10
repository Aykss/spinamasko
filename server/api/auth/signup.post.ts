import { signupSchema } from "~~/server/utils/zod"
import { prisma } from '~~/server/database'
import { nanoid } from 'nanoid'
import { AuthGodparent } from "~~/server/utils/types"

export default defineEventHandler(async (event) => {
    const result = await readValidatedBody(event, body => signupSchema.safeParse(body))

    if(!result.success){
        throw createError({
            statusCode: 400,
            statusMessage: result.error.issues.map(e => e.message).join(', ')
        })
    } 

    const data = result.data

    await prisma.$connect()
    console.log("✅ Prisma connected successfully")
    
    // const existing = await prisma.godparents.findFirst({
    //     where: {
    //         email: data.email
    //     }
    // })

    // if(existing != null){
    //     throw createError({
    //         statusCode: 409,
    //         statusMessage: "Email is already in use"
    //     })
    // }

    // const hashedPassword = await getHashedPassword(data.password)

    // const godparent = await prisma.godparents.create({
    //     data: {
    //         ...data,
    //         password: hashedPassword,
    //         unique_id: nanoid(8)
    //     },
    //     select: {
    //         id: true,
    //         unique_id: true,
    //         name: true,
    //         email: true
    //     }
    // })

    // console.log(godparent)

    // return { success: true, godparent: {...godparent as AuthGodparent}}
    return { success: true}
})