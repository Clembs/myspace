import { db } from '$lib/db';
import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { sql } from 'drizzle-orm';

export const load: LayoutServerLoad = async ({ params: { username } }) => {
	const user = await db.query.users.findFirst({
		where: (user, { eq }) => eq(sql`LOWER(${user.username})`, username.toLowerCase()),
		columns: {
			id: true,
			avatar: true,
			displayName: true,
			last_online: true,
			pronouns: true,
			status: true,
			widgets: true,
			username: true
		}
	});

	if (!user) throw error(404, 'User not found');

	// if the capitalization of the username is incorrect, redirect to the correct URL
	if (username !== user.username) {
		redirect(301, `/${user.username}`);
	}

	return {
		user
	};
};
