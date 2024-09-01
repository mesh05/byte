import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema/index";

const queryClient = postgres(process.env.DATABASE_URL as string);

const db = drizzle(queryClient, { schema, logger: true });

export default db;
