import { db } from "@/lib/db";

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
