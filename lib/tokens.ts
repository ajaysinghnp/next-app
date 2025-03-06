import { db } from "@/lib/db";
import { getVerificationTokenByEmail } from "@/lib/tokens/email-verification";
import { getPasswordResetTokenByEmail } from "@/lib/tokens/password-reset";

export const genrateVerificationToken = async (email: string) => {
  try {
    const token = Math.random().toString(36).substring(2, 15);
    const expires = new Date(new Date().getTime() + 60 * 60 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
      await db.verificationToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    const verfificationToken = db.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    return verfificationToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const generatePasswordResetToken = async (email: string) => {
  try {
    const token = Math.random().toString(36).substring(2, 15);
    const expires = new Date(new Date().getTime() + 60 * 60 * 1000);

    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
      await db.passwordResetToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    const passwordResetToken = db.passwordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    return passwordResetToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};