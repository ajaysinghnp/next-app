import { StandardSchemaV1 } from "@t3-oss/env-core";
import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]),
    AUTH_URL: z.string().url(),
    AUTH_SECRET: z.string(),
    SALT_ROUNDS: z.coerce.number(),
    DATABASE_URL: z.string().url(),
    RESEND_API_KEY: z.string(),
    PUBLIC_URL: z.string().url(),
  },
  onValidationError: (issues: readonly StandardSchemaV1.Issue[]) => {
    console.error("⨯ Invalid environment variables:", issues);
    // eslint-disable-next-line n/no-process-env
    console.log(process.env);
    throw new Error("Invalid environment variables");
  },
  emptyStringAsUndefined: true,
  // eslint-disable-next-line n/no-process-env
  experimental__runtimeEnv: process.env,
});
