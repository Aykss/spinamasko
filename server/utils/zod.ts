import z from "zod";

export const loginSchema = z.object({
  name: z.string(),
  password: z.string(),
});

export const signupSchema = z.object({
  password: z.string(),
  pronouns: z.number(),
  name: z.string(),
});

export const godparentSearchSchema = z.object({
  query: z.string(),
});
