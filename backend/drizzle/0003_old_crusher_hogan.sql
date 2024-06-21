CREATE TABLE IF NOT EXISTS "item_location" (
	"item_id" uuid NOT NULL,
	"latitude" real NOT NULL,
	"longitude" real NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_location" ADD CONSTRAINT "item_location_item_id_item_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."item"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
