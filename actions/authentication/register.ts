"use server";

import { z } from "zod";

import { RegisterSchema } from "@/schemas/auth";

export const register = async (credentials: z.infer<typeof RegisterSchema>) => {
  const validatedCredentials = RegisterSchema.safeParse(credentials);

  if (!validatedCredentials.success) {
    return { error: "Invalid Data Provided Please Recheck the inputs!" };
  }

  return { success: "Email Sent!" };
};
