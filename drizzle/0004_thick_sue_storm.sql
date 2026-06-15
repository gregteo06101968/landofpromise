CREATE TABLE "objective_review_questions" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_objective_id" integer NOT NULL,
	"question" text NOT NULL,
	"position" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "review_question_responses" (
	"id" serial PRIMARY KEY NOT NULL,
	"session_run_id" integer NOT NULL,
	"registration_id" integer NOT NULL,
	"review_question_id" integer NOT NULL,
	"checked" boolean DEFAULT false NOT NULL,
	CONSTRAINT "review_question_responses_session_run_id_registration_id_review_question_id_unique" UNIQUE("session_run_id","registration_id","review_question_id")
);
--> statement-breakpoint
ALTER TABLE "objective_review_questions" ADD CONSTRAINT "objective_review_questions_session_objective_id_session_objectives_id_fk" FOREIGN KEY ("session_objective_id") REFERENCES "public"."session_objectives"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_question_responses" ADD CONSTRAINT "review_question_responses_session_run_id_objective_session_runs_id_fk" FOREIGN KEY ("session_run_id") REFERENCES "public"."objective_session_runs"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_question_responses" ADD CONSTRAINT "review_question_responses_registration_id_registrations_id_fk" FOREIGN KEY ("registration_id") REFERENCES "public"."registrations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review_question_responses" ADD CONSTRAINT "review_question_responses_review_question_id_objective_review_questions_id_fk" FOREIGN KEY ("review_question_id") REFERENCES "public"."objective_review_questions"("id") ON DELETE cascade ON UPDATE no action;