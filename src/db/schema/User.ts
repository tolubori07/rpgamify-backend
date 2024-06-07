import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
  id: integer('id').primaryKey(),
  username: text('name').unique().notNull(),
  age: integer('age').notNull(),
  email: text('email').unique().notNull(),
  health: text('health').notNull(),
  exp: integer('exp').notNull(),
  level: integer('level').notNull()
})

