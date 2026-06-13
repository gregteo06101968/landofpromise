ALTER TABLE "class_sessions" RENAME TO "community_sessions";--> statement-breakpoint
ALTER TABLE "registrations" RENAME COLUMN "class_session_id" TO "community_session_id";--> statement-breakpoint
ALTER TABLE "community_sessions" RENAME CONSTRAINT "class_sessions_created_by_admin_id_admins_id_fk" TO "community_sessions_created_by_admin_id_admins_id_fk";--> statement-breakpoint
ALTER TABLE "registrations" RENAME CONSTRAINT "registrations_class_session_id_class_sessions_id_fk" TO "registrations_community_session_id_community_sessions_id_fk";--> statement-breakpoint
ALTER TABLE "registrations" RENAME CONSTRAINT "registrations_child_id_class_session_id_unique" TO "registrations_child_id_community_session_id_unique";
