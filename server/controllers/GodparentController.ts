import { DB } from "~~/lib/database";

export async function GetGodparentByUniqueID(unique_id: string) {
  return await DB.godparents.findUnique({
    where: {
      unique_id: unique_id,
    },
  });
}
