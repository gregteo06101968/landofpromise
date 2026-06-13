CREATE TYPE "public"."media_type" AS ENUM('photo', 'video');--> statement-breakpoint
CREATE TYPE "public"."progress_rating" AS ENUM('needs_improvement', 'developing', 'meets_expectations', 'exceeds_expectations');--> statement-breakpoint
CREATE TABLE "attendance_records" (
	"id" serial PRIMARY KEY NOT NULL,
	"registration_id" integer NOT NULL,
	"attendance_date" date NOT NULL,
	"present" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "attendance_records_registration_id_attendance_date_unique" UNIQUE("registration_id","attendance_date")
);
--> statement-breakpoint
CREATE TABLE "observations" (
	"id" serial PRIMARY KEY NOT NULL,
	"registration_id" integer NOT NULL,
	"note" text NOT NULL,
	"created_by_admin_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "progress_assessments" (
	"id" serial PRIMARY KEY NOT NULL,
	"registration_id" integer NOT NULL,
	"rating" "progress_rating" NOT NULL,
	"notes" text,
	"created_by_admin_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session_media" (
	"id" serial PRIMARY KEY NOT NULL,
	"community_session_id" integer NOT NULL,
	"url" text NOT NULL,
	"type" "media_type" NOT NULL,
	"caption" varchar(255),
	"uploaded_by_admin_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session_objectives" (
	"id" serial PRIMARY KEY NOT NULL,
	"community_session_id" integer NOT NULL,
	"week_number" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "session_objectives_community_session_id_week_number_unique" UNIQUE("community_session_id","week_number")
);
--> statement-breakpoint
ALTER TABLE "attendance_records" ADD CONSTRAINT "attendance_records_registration_id_registrations_id_fk" FOREIGN KEY ("registration_id") REFERENCES "public"."registrations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "observations" ADD CONSTRAINT "observations_registration_id_registrations_id_fk" FOREIGN KEY ("registration_id") REFERENCES "public"."registrations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "observations" ADD CONSTRAINT "observations_created_by_admin_id_admins_id_fk" FOREIGN KEY ("created_by_admin_id") REFERENCES "public"."admins"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "progress_assessments" ADD CONSTRAINT "progress_assessments_registration_id_registrations_id_fk" FOREIGN KEY ("registration_id") REFERENCES "public"."registrations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "progress_assessments" ADD CONSTRAINT "progress_assessments_created_by_admin_id_admins_id_fk" FOREIGN KEY ("created_by_admin_id") REFERENCES "public"."admins"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session_media" ADD CONSTRAINT "session_media_community_session_id_community_sessions_id_fk" FOREIGN KEY ("community_session_id") REFERENCES "public"."community_sessions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session_media" ADD CONSTRAINT "session_media_uploaded_by_admin_id_admins_id_fk" FOREIGN KEY ("uploaded_by_admin_id") REFERENCES "public"."admins"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session_objectives" ADD CONSTRAINT "session_objectives_community_session_id_community_sessions_id_fk" FOREIGN KEY ("community_session_id") REFERENCES "public"."community_sessions"("id") ON DELETE cascade ON UPDATE no action;