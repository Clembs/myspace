import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

if (!process.env.DATABASE_URL) {
	throw new Error('DATABASE_URL is not defined.');
}

export default defineConfig({
	dialect: 'postgresql',
	schema: './src/lib/db/schema/*',
	dbCredentials: {
		url: process.env.DATABASE_URL
	}
});
