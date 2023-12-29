import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    CLERK_PUBLISHABLE_KEY: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
    CLERK_SIGN_IN_URL: z.string().min(1),
    CLERK_SIGN_UP_URL: z.string().min(1),
    CLERK_AFTER_SIGN_IN_URL: z.string().min(1),
    CLERK_AFTER_SIGN_UP_URL: z.string().min(1),
    POSTGRES_URI: z.string().min(1),
  },
  clientPrefix: "VITE_",
  client: {},
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
