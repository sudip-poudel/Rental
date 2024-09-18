DO $$ BEGIN
 CREATE TYPE "public"."itemStauts" AS ENUM('available', 'inrent', 'unavailable');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."rentalStatus" AS ENUM('returnRejected', 'returnAccepted', 'returnRequested', 'requestRejected', 'requestAccepted', 'returned', 'rented', 'requested');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "item" DROP CONSTRAINT "item_category_category_id_fk";
--> statement-breakpoint
ALTER TABLE "item_category" DROP CONSTRAINT "item_category_category_id_category_id_fk";
--> statement-breakpoint
ALTER TABLE "item_location" DROP CONSTRAINT "item_location_item_id_item_id_fk";
--> statement-breakpoint
ALTER TABLE "rentals" ALTER COLUMN "rented_at" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "rentals" ALTER COLUMN "rented_at" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "rentals" ALTER COLUMN "returned_at" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "rentals" ALTER COLUMN "returned_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "item" ADD COLUMN "rent_start" date NOT NULL;--> statement-breakpoint
ALTER TABLE "item" ADD COLUMN "rent_end" date NOT NULL;--> statement-breakpoint
ALTER TABLE "item" ADD COLUMN "itemStatus" "itemStauts" DEFAULT 'available' NOT NULL;--> statement-breakpoint
ALTER TABLE "rentals" ADD COLUMN "initial_deposit" real NOT NULL;--> statement-breakpoint
ALTER TABLE "rentals" ADD COLUMN "rate" real NOT NULL;--> statement-breakpoint
ALTER TABLE "rentals" ADD COLUMN "status" "rentalStatus" DEFAULT 'requested' NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item" ADD CONSTRAINT "item_category_category_id_fk" FOREIGN KEY ("category") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_category" ADD CONSTRAINT "item_category_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "item_location" ADD CONSTRAINT "item_location_item_id_item_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."item"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
