import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import {users} from './Users';

export const notes = sqliteTable('notes', {
  id: integer('id').primaryKey(),
   userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdAt: text('created_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updateAt: integer('updated_at', { mode: 'timestamp' }).$onUpdate(() => new Date()),
  contents: text('contents').notNull()
});


export type InsertPost = typeof notes.$inferInsert;
export type SelectPost = typeof notes.$inferSelect;
