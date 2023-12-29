import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "~/schemas";
import postgres from "postgres";
import { env } from "~/env";

// for query purposes
const queryClient = postgres(env.POSTGRES_URI);
export const db = drizzle(queryClient, { schema });
