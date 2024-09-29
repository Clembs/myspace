import { db } from '$lib/db';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params: { username } }) => {
	const user = await db.query.users.findFirst({
		where: (user, { eq }) => eq(user.username, username),
		columns: {
			avatar: true,
			birthdate: true,
			displayName: true,
			last_online: true,
			id: true,
			pronouns: true,
			status: true,
			widgets: true,
			username: true
		}
	});

	if (!user) throw error(404, 'User not found');

	return {
		user
	};
};
