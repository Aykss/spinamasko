import { DB } from "~~/lib/database";
import { Prisma } from "~~/prisma/generated/prisma/client";

export async function CreateGift(data: Prisma.Given_GiftsUncheckedCreateInput) {
  return await DB.given_Gifts.create({
    data: data,
  });
}

export async function GetGiftsByGodparent(godparent_id: number) {
  return await DB.given_Gifts.findMany({
    where: {
      godparents_id: godparent_id,
    },
  });
}
