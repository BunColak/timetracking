import { date, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { InferSelectModel } from "drizzle-orm";

export const timelogs = pgTable("timelogs", {
  id: serial("id").primaryKey(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  date: date("date").notNull(),
  userId: varchar("user_id").notNull(),
});

export type Timelog = InferSelectModel<typeof timelogs>;
