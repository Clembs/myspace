import type { Actions } from './$types';
import { handleAuthFlow } from './handleAuthFlow';
import { verifyPasskeyAuthChallenge } from './verifyPasskeyAuthChallenge';

export const actions: Actions = {
	handleAuthFlow,
	verifyPasskeyAuthChallenge
};
