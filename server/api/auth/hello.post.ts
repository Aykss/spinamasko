import { TestBody } from "~~/server/utils/types"
import { prisma } from '~~/server/database'

export default defineEventHandler(async(event) => {
    const result = await readValidatedBody(event, body => signupSchema.safeParse(body))
    
    if(!result.success){
        throw createError({
            statusCode: 400,
            statusMessage: result.error.issues.map(e => e.message).join(', ')
        })
    }

    await prisma.$connect()

    return { success: true, body: result.data as TestBody}
})