export default defineEventHandler(async (event) => {
    const session = await getUserSession(event)

    if (!session) {
        throw createError({
        statusCode: 401,
        statusMessage: "Not authenticated"
        })
    }

  return { success: true, godparent: session }
})