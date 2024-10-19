import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  username: text("username").unique().notNull(),
  age: integer("age").notNull(),
  password: text("password").notNull(),
  email: text("email").unique().notNull(),
  health: integer("health").notNull().default(100),
  exp: integer("exp").notNull().default(0),
  max_exp: integer("max_exp").notNull().default(100),
  level: integer("level").notNull().default(1),
  gold: integer("gold").notNull().default(100),
  energy: integer("energy").notNull().default(50),
  max_energy: integer("max_energy").notNull().default(50),
  class: text("class").notNull().default("Emitter"),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
