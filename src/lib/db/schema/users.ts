import type { Widget } from '$lib/widgets/types';
import { sql } from 'drizzle-orm';
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

export type User = typeof users.$inferSelect;

export const passkeys = pgTable('passkeys', {
	credentialId: text('credential_id').primaryKey(),
	userId: text('user_id').references(() => users.id),
	publicKey: text('public_key').notNull(),
	counter: text('counter').notNull(),
	name: text('name').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow()
});

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
