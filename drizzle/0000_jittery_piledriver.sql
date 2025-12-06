CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"username" varchar NOT NULL,
	"password_hash" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
