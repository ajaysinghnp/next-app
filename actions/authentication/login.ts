"use server";

import { z } from "zod";

import { comparePassword } from "@/lib/security";
import { getUserByUsername } from "@/lib/user";
import { LoginSchema } from "@/schemas/auth";

export const login = async (credentials: z.infer<typeof LoginSchema>) => {
  const validatedCredentials = LoginSchema.safeParse(credentials);

  if (!validatedCredentials.success) {
    return { error: "❌ Invalid credentials!" };
  }

  const { username, password } = validatedCredentials.data;

  const existingUser = await getUserByUsername(username);

  if (!existingUser) {
    return { error: "❌ Invalid Credentials!" };
  }

  if (!existingUser.password) {
    return { error: "❌ Invalid Credentials!" };
  }

  const validPassword = await comparePassword(password, existingUser.password);

  if (!validPassword) {
    return { error: "❌ Invalid Credentials!" };
  }

  return { success: "Logged in!" };
};
