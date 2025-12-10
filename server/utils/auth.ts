import bycrypt from "bcryptjs";

export async function getHashedPassword(password: string) {
  const saltRounds = 12;
  return await bycrypt.hash(password, saltRounds);
}

export async function verifyHashedPassword(
  hashedPassword: string,
  plainPassword: string,
) {
  return await bycrypt.compare(plainPassword, hashedPassword);
}
