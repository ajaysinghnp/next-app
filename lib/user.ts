import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { z } from "zod";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas/auth";

export const getUserByEmail = async (email: string) => {
  try {
    return await db.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { getUserByUsername } from "@/auth.config";

export const getUserById = async (id: string) => {
  if (!id) return null;
  try {
    return await db.user.findUnique({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const registerUser = async (data: z.infer<typeof RegisterSchema>) => {
  const { name, username, email, password } = data;

  try {
    await db.user.create({
      data: {
        name,
        username,
        email,
        password,
      },
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return { error: error.message };
    }
    return { error: "Something went wrong while registering the user!" };
  }

  return { success: "Congratulations🎉🎊 User Registered Successfully!" };
};
