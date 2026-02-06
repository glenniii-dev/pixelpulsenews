ALTER TABLE "articles" ALTER COLUMN "order" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "articles" ALTER COLUMN "order" SET DATA TYPE integer USING "order"::integer;--> statement-breakpoint
ALTER TABLE "articles" ALTER COLUMN "order" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "newsletters" ALTER COLUMN "order" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "newsletters" ALTER COLUMN "order" SET DATA TYPE integer USING "order"::integer;--> statement-breakpoint
ALTER TABLE "newsletters" ALTER COLUMN "order" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "opportunities" ALTER COLUMN "order" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "opportunities" ALTER COLUMN "order" SET DATA TYPE integer USING "order"::integer;--> statement-breakpoint
ALTER TABLE "opportunities" ALTER COLUMN "order" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "research" ALTER COLUMN "order" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "research" ALTER COLUMN "order" SET DATA TYPE integer USING "order"::integer;--> statement-breakpoint
ALTER TABLE "research" ALTER COLUMN "order" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "resources" ALTER COLUMN "order" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "resources" ALTER COLUMN "order" SET DATA TYPE integer USING "order"::integer;--> statement-breakpoint
ALTER TABLE "resources" ALTER COLUMN "order" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "team" ALTER COLUMN "order" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "team" ALTER COLUMN "order" SET DATA TYPE integer USING "order"::integer;--> statement-breakpoint
ALTER TABLE "team" ALTER COLUMN "order" SET DEFAULT 0;