import { GetGodchildrenByGodparentId } from "~~/server/controllers/GodchildrenController";
import { godparentIdSchema } from "~~/server/utils/zod";

export default defineEventHandler(async (event) => {
  const result = await getValidatedRouterParams(event, (body) =>
    godparentIdSchema.safeParse(body),
  );

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.issues.map((e) => e.message).join(", "),
    });
  }

  const data = result.data;

  return await GetGodchildrenByGodparentId(data.godparent_id);
});
