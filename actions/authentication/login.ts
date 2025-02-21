"use server";

import { AuthError } from "next-auth";
import { z } from "zod";

import { signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/config/routes";
import { sendVerificationEmail } from "@/lib/mail";
import { genrateVerificationToken } from "@/lib/tokens";
import { getUserByUsername } from "@/lib/user";
import { LoginSchema } from "@/schemas/auth";

export const login = async (credentials: z.infer<typeof LoginSchema>) => {
  const validatedCredentials = LoginSchema.safeParse(credentials);

  if (!validatedCredentials.success) {
    return { error: "⨯ Invalid credentials!" };
  }

  const { username, password } = validatedCredentials.data;

  const user = await getUserByUsername(username);

  if (!user || !user.email || !user.password) {
    return { error: "⨯ User doesn't exists in this context!" };
  }

  if (!user.emailVerified) {
    const verificationToken = await genrateVerificationToken(user.email);

    if (!verificationToken) return { error: "Failed to Generate Verification Token!" };

    const sent = await sendVerificationEmail(verificationToken.email, verificationToken.token);

    if (!sent) return { error: "Failed to Send Confirmation Email!" };

    return { success: "📧 Confirmation email sent again!" };
  }

  //TODO add the logic for 2FA

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
          return { error: "⨯ Invalid Credentials!" };
        default:
          return { error: "⨯ Email create error!" };
      }
    }
    throw error;
  }
};

export const logOut = async () => {
  await signOut({ redirectTo: "/login" });
};
