import { CreateGift } from "~~/server/controllers/GivenGiftController";
import { addGivenGiftSchema } from "~~/server/utils/zod";

export default defineEventHandler(async (event) => {
  const rawParam = await getValidatedRouterParams(event, (params) =>
    godparentIdSchema.safeParse(params),
  );

  if (!rawParam.success) {
    throw createError({
      statusCode: 400,
      statusMessage: rawParam.error.issues.map((e) => e.message).join(", "),
    });
  }

  const result = await readValidatedBody(event, (body) =>
    addGivenGiftSchema.safeParse(body),
  );

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.issues.map((e) => e.message).join(", "),
    });
  }

  const data = result.data;
  const param = rawParam.data;

  const given_gift = await CreateGift({
    ...data,
    godparents_id: param.godparent_id,
  });

  return given_gift;
});
