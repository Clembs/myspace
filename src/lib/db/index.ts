import postgres from 'postgres';
import { DATABASE_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as users from './schema/users';

const client = postgres(DATABASE_URL);

export const db = drizzle(client, {
	schema: users
});
