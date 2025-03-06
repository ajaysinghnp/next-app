import { db } from "@/lib/db";

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verfificationToken = db.verificationToken.findUnique({
      where: {
        token,
      },
    });

    return verfificationToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verfificationToken = db.verificationToken.findFirst({
      where: {
        email,
      },
    });

    return verfificationToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};