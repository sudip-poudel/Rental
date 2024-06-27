ALTER TABLE "item" ALTER COLUMN "added_by" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "item" ADD COLUMN "initial_deposit" real;--> statement-breakpoint
ALTER TABLE "item_category" ADD COLUMN "id" uuid DEFAULT gen_random_uuid() NOT NULL;