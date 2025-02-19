import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { db } from "@/lib/db";
import { LoginSchema } from "@/schemas/auth";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedCredentials = LoginSchema.safeParse(credentials);
        if (validatedCredentials.success) {
          const { username, password } = validatedCredentials.data;
          const user = await getUserByUsername(username);
          if (!user || !user.password) return null;
          const validPassword = await comparePassword(password, user.password);
          if (validPassword) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

async function getUserByUsername(username: string) {
  try {
    return await db.user.findUnique({
      where: { username },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
