import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

export type extendedUser = DefaultSession["user"] & {
  role: UserRole;
};
