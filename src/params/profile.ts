import { USERNAME_REGEX } from '$lib/helpers/regex';

export function match(param) {
	return USERNAME_REGEX.test(param);
}
