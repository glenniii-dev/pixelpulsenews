ALTER TABLE "resources" ALTER COLUMN "title" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "research" ADD COLUMN "slug" varchar DEFAULT 'temp-slug' NOT NULL;--> statement-breakpoint
ALTER TABLE "research" ADD COLUMN "bio" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "research" ADD COLUMN "content" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "research" ADD COLUMN "references" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "research" ADD COLUMN "isPublished" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "resources" ADD COLUMN "slug" varchar DEFAULT 'temp-slug' NOT NULL;--> statement-breakpoint
ALTER TABLE "resources" ADD COLUMN "content" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "resources" ADD COLUMN "isPublished" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "research" DROP COLUMN "summary";--> statement-breakpoint
ALTER TABLE "research" DROP COLUMN "pdf_url";--> statement-breakpoint
ALTER TABLE "resources" DROP COLUMN "topic";--> statement-breakpoint
ALTER TABLE "resources" DROP COLUMN "doc_url";