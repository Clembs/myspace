import type { Widget } from '$lib/widgets/types';
import { relations, sql } from 'drizzle-orm';
import { jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: text('id').primaryKey(),
	email: text('email').notNull().unique(),
	challenge: text('challenge'),
	challengeExpiresAt: timestamp('challenge_expires_at'),
	username: text('username').notNull().unique(),
	displayName: text('display_name').notNull(),
	avatar: text('avatar'),
	birthdate: text('birthdate'),
	pronouns: text('pronouns'),
	last_online: timestamp('last_online', {
		withTimezone: true
	}).defaultNow(),
	widgets: jsonb('widgets').default([]).$type<Widget[]>(),
	status: text('status', {
		enum: ['online', 'dnd', 'offline']
	}).notNull()
});

export const usersRelations = relations(users, ({ many }) => ({
	passkeys: many(passkeys),
	sessions: many(sessions)
}));

export type User = typeof users.$inferSelect;

export const passkeys = pgTable('passkeys', {
	credentialId: text('credential_id').primaryKey(),
	userId: text('user_id').references(() => users.id),
	publicKey: text('public_key').notNull(),
	counter: text('counter').notNull(),
	name: text('name').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

export const passkeysRelations = relations(passkeys, ({ one }) => ({
	user: one(users, {
		fields: [passkeys.userId],
		references: [users.id]
	})
}));

export type Passkey = typeof passkeys.$inferSelect;

export const otps = pgTable('otps', {
	id: text('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	otp: text('otp').notNull(),
	email: text('email').notNull(),
	expiresAt: timestamp('expires_at').notNull()
});

export type Otp = typeof otps.$inferSelect;

export const sessions = pgTable('sessions', {
	id: text('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	name: text('name').notNull(),
	deviceType: text('device_type', {
		enum: ['desktop', 'mobile', 'other']
	}).notNull(),
	userId: text('user_id').references(() => users.id),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	expiresAt: timestamp('expires_at').notNull()
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	})
}));

export type Session = typeof sessions.$inferSelect;
