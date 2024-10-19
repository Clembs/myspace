import type { AnyWidget } from '$lib/widgets/types';
import { relations, sql } from 'drizzle-orm';
import { integer, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
	id: text('id').primaryKey(),
	email: text('email').notNull().unique(),
	challenge: text('challenge'),
	challengeExpiresAt: timestamp('challenge_expires_at'),
	username: text('username').notNull().unique(),
	displayName: text('display_name'),
	avatar: text('avatar'),
	birthdate: text('birthdate'),
	pronouns: text('pronouns'),
	last_online: timestamp('last_online', {
		withTimezone: true
	}).defaultNow(),
	widgets: jsonb('widgets')
		.default([
			[
				{
					id: 'music',
					position: 1,
					content_url: undefined,
					content_type: undefined
				},
				{
					id: 'favorites',
					position: 2
				}
			],
			[
				{
					id: 'about_me',
					content: 'Hello, Islands!',
					position: 1
				},
				{
					id: 'friends',
					position: 2
				},
				{
					id: 'comments',
					position: 3
				}
			]
		] as AnyWidget[][])
		.$type<AnyWidget[][]>()
		.notNull(),
	status: text('status', {
		enum: ['online', 'dnd', 'offline']
	})
		.notNull()
		.default('offline')
	// theme: jsonb('theme')
});

export const usersRelations = relations(users, ({ many }) => ({
	passkeys: many(passkeys),
	sessions: many(sessions)
}));

export type User = typeof users.$inferSelect;

export type FullUser = User & {
	passkeys: Passkey[];
	sessions: Session[];
};

export const passkeys = pgTable('passkeys', {
	credentialId: text('credential_id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	publicKey: text('public_key').notNull(),
	counter: integer('counter').notNull(),
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

export const authCodes = pgTable('auth_codes', {
	id: text('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	code: text('code').notNull(),
	email: text('email').notNull(),
	expiresAt: timestamp('expires_at').notNull()
});

export type AuthCode = typeof authCodes.$inferSelect;

export const sessions = pgTable('sessions', {
	id: text('id')
		.primaryKey()
		.default(sql`gen_random_uuid()`),
	name: text('name').notNull(),
	deviceType: text('device_type', {
		enum: ['desktop', 'mobile', 'other']
	}).notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
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
