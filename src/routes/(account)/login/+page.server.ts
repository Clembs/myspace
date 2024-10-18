import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { verifyPasskeyAuthChallenge } from './verifyPasskeyAuthChallenge';
import { handleAuthFlow } from './handleAuthFlow';

export const load: PageServerLoad = async ({ parent, locals: { getCurrentUser } }) => {
	const currentUser = await getCurrentUser();

	if (currentUser) {
		redirect(302, `/${currentUser.username}`);
	}

	return {
		login: (await parent()).login || ''
	};
};

export const actions: Actions = {
	handleAuthFlow,
	verifyPasskeyAuthChallenge
};
