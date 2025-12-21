import z from "zod";

export const ZodMaybeNumber = z.union([
  z.number(),
  z.string().pipe(z.coerce.number()),
]);

export const loginSchema = z.object({
  name: z.string(),
  password: z.string(),
});

export const signupSchema = z.object({
  password: z.string(),
  pronouns: ZodMaybeNumber,
  name: z.string(),
});

export const godparentSearchSchema = z.object({
  query: z.string(),
});

export const godparentIdSchema = z.object({
  godparent_id: ZodMaybeNumber,
});

export const addInaanakSchema = z.object({
  name: z.string(),
  total_chances: ZodMaybeNumber,
});
