ALTER TABLE "articles" ADD COLUMN "order" varchar DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "newsletters" ADD COLUMN "order" varchar DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "opportunities" ADD COLUMN "order" varchar DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "research" ADD COLUMN "order" varchar DEFAULT '0' NOT NULL;--> statement-breakpoint
ALTER TABLE "resources" ADD COLUMN "order" varchar DEFAULT '0' NOT NULL;