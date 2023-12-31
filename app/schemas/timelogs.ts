import { date, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";

export const timelogs = pgTable("timelogs", {
  id: serial("id").primaryKey(),
  startTime: varchar("start_time").notNull(),
  endTime: varchar("end_time").notNull(),
  date: date("date").notNull(),
  userId: varchar("user_id").notNull(),
});

export type Timelog = InferSelectModel<typeof timelogs>;
