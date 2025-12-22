import { DB } from "~~/lib/database";
import type { Prisma } from "~~/prisma/generated/prisma/client";

export async function GetGodchildrenByGodparentId(godparent_id: number) {
  return await DB.godchildren.findMany({
    where: {
      godparents_id: godparent_id,
    },
  });
}

export async function CreateGodchildren(
  data: Prisma.GodchildrenUncheckedCreateInput,
) {
  return await DB.godchildren.create({
    data: data,
  });
}
