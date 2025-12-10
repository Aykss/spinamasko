import { signupSchema } from "~~/server/utils/zod"
import { nanoid } from 'nanoid'
import { AuthGodparent } from "~~/server/utils/types"
import { CreateGodparent, FindGodparentByEmail } from "~~/server/controllers/AuthController"

export default defineEventHandler(async (event) => {
    const result = await readValidatedBody(event, body => signupSchema.safeParse(body))

    if(!result.success){
        throw createError({
            statusCode: 400,
            statusMessage: result.error.issues.map(e => e.message).join(', ')
        })
    } 

    const data = result.data
    
    const existing = await FindGodparentByEmail(data.email)

    if(existing != null){
        throw createError({
            statusCode: 409,
            statusMessage: "Email is already in use"
        })
    }

    const hashedPassword = await getHashedPassword(data.password)

    const godparent = await CreateGodparent({
            ...data,
            password: hashedPassword,
            unique_id: nanoid(8)
        })

    return { success: true, godparent: {...godparent as AuthGodparent}}
    // return { success: true}
})