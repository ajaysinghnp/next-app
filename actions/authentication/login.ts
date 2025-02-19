"use server";

import { z } from "zod";

import { LoginSchema } from "@/schemas/auth";

export const login = async (credentials: z.infer<typeof LoginSchema>) => {
  const validatedCredentials = LoginSchema.safeParse(credentials);

  if (!validatedCredentials.success) {
    return { error: "Invalid credentials!" };
  }

  return { success: "Logged in!" };
};
