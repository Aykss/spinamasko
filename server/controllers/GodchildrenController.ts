import { DB } from "~~/lib/database";

export async function GetGodchildrenByGodparentId(godparent_id: number) {
  return await DB.godchildren.findMany({
    where: {
      godparents_id: godparent_id,
    },
  });
}
