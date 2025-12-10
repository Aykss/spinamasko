import { FindGodparentByEmail } from "~~/server/controllers/AuthController"

export default defineEventHandler(async (event) => {
    const result = await readValidatedBody(event, body => loginSchema.safeParse(body))

    if(!result.success){
        throw createError({
        statusCode: 400,
        statusMessage: result.error.issues.map(e => e.message).join(', ')
        })
    }

    const {email, password} = result.data

    const godparent = await FindGodparentByEmail(email)

    if(!godparent){
        throw createError({
            statusCode: 401,
            statusMessage: "Invalid Credentials"
        })
    }

    const samePassword = await verifyHashedPassword(godparent.password, password)

    if(!samePassword){
            throw createError({
            statusCode: 401,
            statusMessage: "Invalid Credentials"
        })
    }

    const user = {
        id: godparent.id,
        name: godparent.name,
        email: godparent.email,
        unique_id: godparent.unique_id
    }

    await setUserSession(event, user)

    return {success: true, godparent: {...user}}
})