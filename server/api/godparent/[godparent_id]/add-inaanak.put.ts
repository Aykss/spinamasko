import { CreateGodchildren } from "~~/server/controllers/GodchildrenController";

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body) =>
    addInaanakSchema.safeParse(body),
  );

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.issues.map((e) => e.message).join(", "),
    });
  }

  const rawParam = await getValidatedRouterParams(event, (params) =>
    godparentIdSchema.safeParse(params),
  );

  if (!rawParam.success) {
    throw createError({
      statusCode: 400,
      statusMessage: rawParam.error.issues.map((e) => e.message).join(", "),
    });
  }

  const data = result.data;

  const param = rawParam.data;

  const godchildren = await CreateGodchildren({
    ...data,
    used_chances: 0,
    godparents_id: param.godparent_id,
  });

  return godchildren;
});
