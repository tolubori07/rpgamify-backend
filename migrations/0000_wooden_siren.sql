CREATE TABLE `notes` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer,
	`contents` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `todos` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`user_id` integer NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`updated_at` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`age` integer NOT NULL,
	`password` text NOT NULL,
	`email` text NOT NULL,
	`health` integer DEFAULT 100 NOT NULL,
	`exp` integer DEFAULT 0 NOT NULL,
	`max_exp` integer DEFAULT 100 NOT NULL,
	`level` integer DEFAULT 1 NOT NULL,
	`gold` integer DEFAULT 100 NOT NULL,
	`energy` integer DEFAULT 50 NOT NULL,
	`max_energy` integer DEFAULT 50 NOT NULL,
	`class` text DEFAULT 'Emitter' NOT NULL,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
