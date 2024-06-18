DROP INDEX IF EXISTS "emainIndex";--> statement-breakpoint
ALTER TABLE "item" ADD COLUMN "rate" real NOT NULL;--> statement-breakpoint
ALTER TABLE "item" ADD COLUMN "picture_url" text NOT NULL;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "emailIndex" ON "users" ("email");