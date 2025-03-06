"use server";

import { hashPassword } from "@/lib/security";
import { getPasswordResetTokenByToken } from "@/lib/tokens/password-reset";
import { getUserByEmail, updatePassword } from "@/lib/user";
import { NewPasswordSchema } from "@/schemas/auth";

export const changePassword = async (password: string, token: string) => {
  if (!password || !token) {
    return { error: "Missing Password or Token!" };
  }

  const validation = NewPasswordSchema.safeParse({ password });
  
  if (!validation.success) {
    return { error: "Invalid new Password!" };
  }

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid Token!" };
  }
  
  const hasExpired = new Date() > new Date(existingToken.expires);

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const user = await getUserByEmail(existingToken.email);

  if (!user) {
    return { error: "No any associated user found!" };
  }

  const update = await updatePassword(user.id, await hashPassword(password));

  if (update.error) {
    return { error: update.error };
  }

  return { success: "Password changed successfully" };
};
