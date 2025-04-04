"use server";

import { z } from "zod";

import { sendVerificationEmail } from "@/lib/mail";
import { hashPassword } from "@/lib/security";
import { genrateVerificationToken } from "@/lib/tokens";
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

  const verificationToken = await genrateVerificationToken(email);

  if (!verificationToken) return { error: "Failed to Generate Verification Token!" };

  const sent = await sendVerificationEmail(verificationToken.email, verificationToken.token);

  if (!sent) return { error: "Failed to Send Confirmation Email!" };

  return { success: "Congratulations🎉🎊 User Registered and Confirmation email sent!" };
};
