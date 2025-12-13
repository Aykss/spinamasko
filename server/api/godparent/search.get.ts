import { FindGodparentByUniqueID } from "~~/server/controllers/GodparentController";
import { godparentSearchSchema } from "~~/server/utils/zod";

export default defineEventHandler(async (event) => {
  const queryString = await readValidatedBody(event, (body) =>
    godparentSearchSchema.safeParse(body),
  );

  if (!queryString.success) {
    throw createError({
      statusCode: 400,
      statusMessage: queryString.error.issues.map((e) => e.message).join(", "),
    });
  }

  const data = queryString.data.query.trim();

  const godparent = await FindGodparentByUniqueID(data);

  return { success: true, godparent };
});
