import { prisma } from "~~/lib/prisma"

export default defineEventHandler(async (event) => {
    const result = await readValidatedBody(event, body => loginSchema.safeParse(body))

    if(!result.success){
        throw createError({
        statusCode: 400,
        statusMessage: result.error.issues.map(e => e.message).join(', ')
        })
    }

    const {email, password} = result.data

    const godparent = await prisma.godparents.findFirst({where: {email}})

    if(!godparent){
        throw createError({
            statusCode: 401,
            statusMessage: "Invalid Credentials"
        })
    }

    const samePassword = await verifyPassword(godparent.password, password)

    if(!samePassword){
            throw createError({
            statusCode: 401,
            statusMessage: "Invalid Credentials"
        })
    }

    await setUserSession(event, {user: {
        id: godparent.id,
        name: godparent.name,
        email: godparent.email,
        unique_id: godparent.unique_id
    }})

    return {success: true, godparent}
})