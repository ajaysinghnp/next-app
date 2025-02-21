"use server";

import { db } from "@/lib/db";
import { getVerificationTokenByToken } from "@/lib/tokens";
import { getUserByEmail } from "@/lib/user";

export const verifyEmail = async (token: string) => {
  if (!token) {
    return { error: "Missing Token!" };
  }

  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Token doesnot exist!" };
  }

  const hasExpired = new Date() > new Date(existingToken.expires);

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const user = await getUserByEmail(existingToken.email);

  if (!user) {
    return { error: "Email doesnot exist!" };
  }

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: `Congratulations🎉🎊 Email Verified: ${existingToken.email}` };
};
