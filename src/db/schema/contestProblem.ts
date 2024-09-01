import {
  integer,
  pgTable,
  primaryKey,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import contestTable from "./contest";
import problemTable from "./problem";
import { uniqueIndex } from "drizzle-orm/sqlite-core";

const contestProblemTable = pgTable(
  "contest_problem",
  {
    contestProblemId: integer("contest_problem_id").notNull(),
    contestId: uuid("contest_id").references(() => contestTable.id),
    problemId: integer("problem_id").references(() => problemTable.id),
  },
  (table) => {
    return {
      custom_pk: primaryKey({ columns: [table.contestId, table.problemId] }),
    };
  },
);

export default contestProblemTable;
