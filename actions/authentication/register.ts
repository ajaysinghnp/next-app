"use server";

import { z } from "zod";

import { hashPassword } from "@/lib/security";
import { getUserByEmail, getUserByUsername, registerUser } from "@/lib/user";
import { RegisterSchema } from "@/schemas/auth";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedCredentials = RegisterSchema.safeParse(values);

  if (!validatedCredentials.success) {
    return { error: "Invalid Data Provided Please Recheck the inputs!" };
  }

  const { name, username, email, password } = validatedCredentials.data;

  const hashedPassword = await hashPassword(password);

  const existedUsername = await getUserByUsername(username);

  if (existedUsername) {
    return { error: "Username Already Exists!" };
  }

  const existedEmail = await getUserByEmail(email);

  if (existedEmail) {
    return { error: "Email Already Exists!" };
  }

  await registerUser({ name, username, email, password: hashedPassword });

  return { success: "Congratulations🎉🎊 User Registered Successfully!" };
};
