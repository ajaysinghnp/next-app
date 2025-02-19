import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { z } from "zod";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas/auth";

export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    where: { email },
  });
};

export const getUserByUsername = async (username: string) => {
  return await db.user.findUnique({
    where: { username },
  });
};

export const getUserById = async (id: string) => {
  return await db.user.findUnique({
    where: { id },
  });
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
