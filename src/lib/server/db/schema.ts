import { relations } from 'drizzle-orm';
import { pgTable, text, varchar, timestamp, integer, numeric } from 'drizzle-orm/pg-core';

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

export const categories = pgTable('categories', {
	id: integer('id').generatedAlwaysAsIdentity(),
	name: varchar('name').notNull().unique(),
	slug: varchar('slug').notNull().unique()
});
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export const categoriesRelations = relations(categories, ({ many }) => ({
	products: many(products)
}));

export const products = pgTable('products', {
	id: integer('id').generatedAlwaysAsIdentity(),
	productCode: varchar('product_code'),
	barcode: integer('barcode'),
	name: varchar('name').notNull().unique(),
	description: text('description').notNull(),
	price: numeric('price', { precision: 12, scale: 2 }).notNull(),
	imageUrl: text('image_url'),
	categoryId: integer('category_id')
});
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;

export const productsRelations = relations(products, ({ one }) => ({
	category: one(categories, {
		fields: [products.categoryId],
		references: [categories.id]
	})
}));
