import { DB } from "~~/lib/database";

export async function GetReceivedGiftNumberByGiftID(given_gift_id: number) {
  return await DB.received_Gifts.count({
    where: {
      given_gifts_id: given_gift_id,
    },
  });
}
