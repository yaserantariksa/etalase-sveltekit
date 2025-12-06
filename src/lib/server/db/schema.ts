import { pgTable, text, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: text('id').primaryKey(),
	username: varchar('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;


export const sessions = pgTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});
export type Session = typeof sessions.$inferSelect;
export type NewSession = typeof sessions.$inferInsert;