import { integer, pgEnum, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const difficultyEnum = pgEnum("difficulty", ["easy", "medium", "hard"]);

const problemTable = pgTable("problem", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description").notNull(),
  difficulty: difficultyEnum("difficulty").notNull(),
  testCase: varchar("testcase").notNull(),
  output: varchar("output").notNull(),
  hiddenTestCase: varchar("hidden_testcase").notNull(),
  hiddenOutput: varchar("hidden_output").notNull(),
});

export default problemTable;
