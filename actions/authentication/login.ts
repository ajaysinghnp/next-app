"use server";

import { AuthError } from "next-auth";
import { z } from "zod";

import { signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/config/routes";
import { LoginSchema } from "@/schemas/auth";

export const login = async (credentials: z.infer<typeof LoginSchema>) => {
  const validatedCredentials = LoginSchema.safeParse(credentials);

  if (!validatedCredentials.success) {
    return { error: "❌ Invalid credentials!" };
  }

  const { username, password } = validatedCredentials.data;

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "❌ Invalid Credentials!" };
        default:
          return { error: "❌ Email create error!" };
      }
    }
    throw error;
  }
};

export const logOut = async () => {
  await signOut({ redirectTo: "/login" });
};
