import { FindGodparentByName } from "~~/server/controllers/AuthController";

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, (body) =>
    loginSchema.safeParse(body),
  );

  if (!result.success) {
    throw createError({
      statusCode: 400,
      statusMessage: result.error.issues.map((e) => e.message).join(", "),
    });
  }

  const { name, password } = result.data;

  const godparent = await FindGodparentByName(name);

  if (!godparent) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid Credentials",
    });
  }

  const samePassword = await verifyHashedPassword(godparent.password, password);

  if (!samePassword) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid Credentials",
    });
  }

  const user = {
    id: godparent.id,
    name: godparent.name,
    unique_id: godparent.unique_id,
    pronouns: godparent.pronouns,
  };

  await setUserSession(event, { user: user });

  return { success: true, godparent: { ...user } };
});
