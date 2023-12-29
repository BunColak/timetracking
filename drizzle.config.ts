import type { Config } from "drizzle-kit";
import {env} from "~/env";

export default {
    schema: "./app/schemas/index.ts",
    out: "./drizzle",
    driver: "pg",
    dbCredentials: {
        connectionString: env.POSTGRES_URI,
    }
} satisfies Config;