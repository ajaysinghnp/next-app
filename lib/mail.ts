import { Resend } from "resend";

import { app_config } from "@/config/app";
import { business_config } from "@/config/business";
import { env } from "@/env/server";

const resend = new Resend(env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string): Promise<boolean> => {
  const sent = await resend.emails.send({
    from: `${app_config.app_name} <${app_config.app_name.toLowerCase()}@mail.ajaysingh.com.np>`,
    to: [email],
    subject: `Verify your email for ${business_config.name}`,
    html: `
      <p>Click <a href="${env.PUBLIC_URL}/auth/verify/email?token=${token}">here</a> to verify your email.</p>
    `,
  });
  if (sent.error) {
    console.error(sent);
    return false;
  }
  return true;
};

export const sendResetLink = async (email: string, token: string): Promise<boolean> => {
  const sent = await resend.emails.send({
    from: `${app_config.app_name} <${app_config.app_name.toLowerCase()}@mail.ajaysingh.com.np>`,
    to: [email],
    subject: `Reset your password for ${business_config.name}`,
    html: `
      <p>Click <a href="${env.PUBLIC_URL}/auth/new-password?token=${token}">here</a> to reset your password.</p>
    `,
  });
  if (sent.error) {
    console.error(sent);
    return false;
  }
  return true;
};
