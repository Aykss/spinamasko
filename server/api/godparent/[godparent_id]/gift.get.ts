import { GetGiftsByGodparent } from "~~/server/controllers/GivenGiftController";
import { GetReceivedGiftNumberByGiftID } from "~~/server/controllers/ReceivedGiftController";

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

  const param = rawParam.data;

  const gifts = await GetGiftsByGodparent(param.godparent_id);

  const quantityLeft = await Promise.all(
    gifts.map(async (g) => {
      return GetReceivedGiftNumberByGiftID(g.id);
    }),
  );

  return gifts.map((g, i) => ({
    ...g,
    quantityLeft: g.quantity - quantityLeft[i],
  }));
});
