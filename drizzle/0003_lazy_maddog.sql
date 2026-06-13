CREATE TABLE "objective_session_runs" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_objective_id" integer NOT NULL,
	"community_session_id" integer NOT NULL,
	"started_at" timestamp NOT NULL,
	"ended_at" timestamp NOT NULL,
	"duration_seconds" integer NOT NULL,
	"created_by_admin_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "attendance_records" ADD COLUMN "session_run_id" integer;--> statement-breakpoint
ALTER TABLE "observations" ADD COLUMN "session_run_id" integer;--> statement-breakpoint
ALTER TABLE "objective_session_runs" ADD CONSTRAINT "objective_session_runs_session_objective_id_session_objectives_id_fk" FOREIGN KEY ("session_objective_id") REFERENCES "public"."session_objectives"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "objective_session_runs" ADD CONSTRAINT "objective_session_runs_community_session_id_community_sessions_id_fk" FOREIGN KEY ("community_session_id") REFERENCES "public"."community_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "objective_session_runs" ADD CONSTRAINT "objective_session_runs_created_by_admin_id_admins_id_fk" FOREIGN KEY ("created_by_admin_id") REFERENCES "public"."admins"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_session_run_id_objective_session_runs_id_fk" FOREIGN KEY ("session_run_id") REFERENCES "public"."objective_session_runs"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "observations" ADD CONSTRAINT "observations_session_run_id_objective_session_runs_id_fk" FOREIGN KEY ("session_run_id") REFERENCES "public"."objective_session_runs"("id") ON DELETE cascade ON UPDATE no action;