import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { getCurrentUser } }) => {
	const currentUser = await getCurrentUser();

	if (currentUser) {
		redirect(302, `/${currentUser.username}`);
	}
};
