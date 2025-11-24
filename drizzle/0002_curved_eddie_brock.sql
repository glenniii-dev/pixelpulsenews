CREATE TABLE "articles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" varchar NOT NULL,
	"title" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"submittedTo" text NOT NULL,
	"content" text NOT NULL,
	"author" text NOT NULL,
	"isPublished" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
