import { describe, expect, it } from "vitest";
import { GetGodparentByUniqueID } from "../../server/controllers/GodparentController";

describe("Godparent Controller search by unique id", () => {
  it("Godparent should return null if no matches the unique id", async () => {
    const unique_id = "nanoid123";
    const godparent = await GetGodparentByUniqueID(unique_id);

    expect(godparent).toEqual(null);
  });
});
