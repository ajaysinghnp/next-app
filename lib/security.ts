import bcrypt from "bcryptjs";

import { env } from "@/env/server";

export const salt = await bcrypt.genSalt(env.SALT_ROUNDS);

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, salt);
};
