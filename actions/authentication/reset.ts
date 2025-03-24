"use server";

import { sendResetLink } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { getUserByEmail } from "@/lib/user";
import { ResetSchema } from "@/schemas/auth";

export const reset = async (email: string) => {
  const validatedEmail = ResetSchema.safeParse({ email });

  if (!validatedEmail.success) {
    return { error: "⨯ Invalid email!" };
  }

  const user = await getUserByEmail(email);

  if (!user) {
    return { error: "User doesn't exists in this context!" };
  }

  const token = await generatePasswordResetToken(user.email);

  if (!token) {
    return { error: "An error occurred while trying to reset the password. Please try again later." };
  }

  const sent = await sendResetLink(user.email, token.token);

  if (!sent) return { error: "Failed to Send Confirmation Email!" };

  return { success: `Password Resetting Email Sent: ${user.email}` };
};
