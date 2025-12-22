import { GetGodparentByUniqueID } from "~~/server/controllers/GodparentController";
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

  const godparent = await GetGodparentByUniqueID(data);

  if (godparent == null) {
    throw createError({
      statusCode: 401,
      statusMessage: "No godparent found",
    });
  }

  return { success: true, godparent: { ...godparent } };
});
