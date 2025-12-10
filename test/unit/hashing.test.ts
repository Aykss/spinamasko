import { describe, expect, it } from "vitest";
import {
  getHashedPassword,
  verifyHashedPassword,
} from "../../server/utils/auth";

describe("Hashing Utils", () => {
  it("hashPassword should produce a verifiable hash", async () => {
    const password = "password123";
    const hash = await getHashedPassword(password);

    expect(hash).toBeDefined();
    expect(hash).not.toEqual(password);

    const ok = await verifyHashedPassword(hash, password);
    expect(ok).toBe(true);
  });
  it("verifyPassword should fail with wrong password", async () => {
    const password = "password123";
    const hash = await getHashedPassword(password);

    const ok = await verifyHashedPassword(hash, "wrongPass");
    expect(ok).toBe(false);
  });
});
