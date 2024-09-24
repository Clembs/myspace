import { db } from '$lib/db';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('sessionId');

	event.locals.getSession = async () => {
		if (!sessionId) return null;

		return await db.query.sessions.findFirst({
			where: ({ id }, { eq }) => eq(id, sessionId),
			with: { user: true }
		});
	};

	event.locals.getUser = async () => {
		const session = await event.locals.getSession();

		if (!session || !session.user) return null;

		return await db.query.users.findFirst({
			where: ({ id }, { eq }) => eq(id, session.userId),
			with: {
				sessions: true,
				passkeys: true
			}
		});
	};

	return await resolve(event);
};
