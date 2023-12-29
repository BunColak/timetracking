CREATE TABLE IF NOT EXISTS "timelogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"user_id" varchar NOT NULL
);
