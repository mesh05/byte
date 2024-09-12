import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import userTable from "./user";

export const statusEnum = pgEnum("status", [
  "Upcoming",
  "Ongoing",
  "Completed",
]);

const contestTable = pgTable("contest", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  status: statusEnum("status").default("Upcoming").notNull(),
  creatorId: uuid("creator_id")
    .references(() => userTable.id)
    .notNull(),
  startTime: timestamp("startTime").defaultNow().notNull(),
  endTime: timestamp("endTime").defaultNow().notNull(),
});
/*
name: contest_title,
      status: 'Upcoming',
      creatorId: user_id,
      startTime: contest_start_time,
      endTime: contest_end_time,
*/ 

export default contestTable;
