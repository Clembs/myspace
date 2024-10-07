import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { EMAIL_REGEX } from 'valibot';
import { USERNAME_REGEX } from '$lib/helpers/regex';

export const actions: Actions = {
	async validateEmail({ request, url, fetch }) {
		const formData = await request.formData();

		const username = url.searchParams.get('username')?.toString();
		const email = formData.get('email')?.toString();

		if (!email || !EMAIL_REGEX.test(email)) {
			return fail(400, {
				message: 'Invalid email address. Check the requirements and try again.'
			});
		}

		if (!username || !USERNAME_REGEX.test(username)) {
			return fail(400, {
				message: 'Your username was changed and is invalid. Go back and try again.'
			});
		}
	}
};
