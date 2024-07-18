ALTER TABLE `users` ADD `energy` integer DEFAULT 50 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `max_energy` integer DEFAULT 50 NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `class` text DEFAULT 'Emitter' NOT NULL;