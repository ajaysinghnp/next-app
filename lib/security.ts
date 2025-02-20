import bcrypt from "bcryptjs";

import { env } from "@/env/server";

export const salt = await bcrypt.genSalt(env.SALT_ROUNDS);

export { comparePassword } from "@/auth.config";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, salt);
};
