import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { maxLength, minLength, nonEmpty, object, parse, pipe, string } from 'valibot';
import { db } from '$lib/db';
import { users } from '$lib/db/schema/users';
import { eq } from 'drizzle-orm';

export const actions: Actions = {
	async editProfile({ request, locals: { getCurrentUser } }) {
		const currentUser = await getCurrentUser();

		if (!currentUser) redirect(302, '/login');

		const formData = await request.formData();
		const rawData = Object.fromEntries(formData);

		console.log(rawData);

		const UserSchemaValidator = object({
			'about-me': pipe(string(), nonEmpty(), maxLength(2048))
		});

		const data = parse(UserSchemaValidator, rawData);

		await db
			.update(users)
			.set({
				widgets: currentUser.widgets.map((c) =>
					c.map((w) => {
						if (w.id === 'about_me') {
							return {
								...w,
								content: data['about-me']
							};
						} else {
							return w;
						}
					})
				)
			})
			.where(eq(users.id, currentUser.id));

		redirect(302, `/${currentUser.username}`);
	}
};
