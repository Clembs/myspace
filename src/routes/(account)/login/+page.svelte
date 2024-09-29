<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import { onMount } from 'svelte';
	import { object, string, array, number, literal, regex, parse } from 'valibot';

	let login = $state('');
	let browserSupportsPasskeys = $state(false);

	onMount(() => {
		browserSupportsPasskeys = !!(navigator.credentials && navigator.credentials.create);
	});
</script>

<main>
	<Card min-width="500px">
		<h1>Create an account or log in</h1>
		<form
			use:enhance={() =>
				async ({ result, update }) => {
					if (result.type === 'success' && result.data && result.data.authType === 'webauthn') {
						const resultValidation = object({
							authType: literal('webauthn'),
							options: object({
								challenge: string(),
								timeout: literal(60000),
								rpId: string(),
								allowCredentials: array(
									object({
										id: string(),
										type: literal('public-key')
									})
								),
								userVerification: literal('required')
							})
						});

						const data = parse(resultValidation, result.data);

						const { startAuthentication } = await import('@simplewebauthn/browser');

						const credential = await startAuthentication(data.options);

						const formData = new FormData();
						formData.append('login', login);
						formData.append('credential', JSON.stringify(credential));
						formData.append('userAgent', navigator.userAgent);

						const req = await fetch('/api/account?/verifyPasskeyAuthChallenge', {
							method: 'POST',
							body: formData
						});

						if (req.ok) {
							const verificationJson = await req.json();

							if (verificationJson.type === 'success') {
								await goto(`/${verificationJson.data.username}`, {
									invalidateAll: true
								});
							}
						}
					} else {
						await update();
					}
				}}
			action="/api/account?/handleAuthFlow"
			method="post"
		>
			<TextInput
				autocomplete="email webauthn"
				tabindex={1}
				label="Email or username"
				name="login"
				type="text"
				bind:value={login}
			/>

			<Button tabindex={2} type="submit">Continue</Button>
		</form>
	</Card>
</main>

<style lang="scss">
	main {
		display: grid;
		place-items: center;
		height: 100vh;

		h1 {
			font-size: 1.5rem;
		}

		form {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}
	}
</style>
