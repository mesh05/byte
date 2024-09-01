import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const migrateClient = postgres(process.env.DATABASE_URL as string, { max: 1 });

await migrate(drizzle(migrateClient), {
  migrationsFolder: "./migrations",
});

await migrateClient.end();
