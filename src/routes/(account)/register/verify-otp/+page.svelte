<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';

	let { data, form } = $props();
</script>

<header>
	<div class="eyebrow">Create an account - Step 2/3</div>
	<h1>Verify your email address</h1>

	<p>
		The verification code has been sent to your inbox. Type it below to verify your email address.
	</p>
</header>

<form
	use:enhance={() =>
		({ update }) => {
			update({ reset: false });
		}}
	action="?/verifyOTP"
	method="post"
>
	<TextInput
		name="otp"
		inputmode="numeric"
		autocomplete="one-time-code"
		pattern={`\\d\{6\}`}
		minlength={6}
		maxlength={6}
		label="One-time password"
		error={form?.message}
	/>

	<div class="buttons">
		<Button
			type="submit"
			variant="secondary"
			href="/register/email-input?username={data.username}&email={data.email}"
			tabindex={3}
		>
			Back
		</Button>

		<Button type="submit" tabindex={2}>Verify email address</Button>
	</div>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		container-type: inline-size;
	}

	.eyebrow {
		font-size: 0.815rem;
		font-weight: 500;
		color: #656565;
		margin-bottom: 0.5rem;
	}

	h1 {
		margin-bottom: 0.5rem;
	}

	.buttons {
		display: flex;
		gap: 0.5rem;
		width: 100%;
	}

	@container (max-width: 430px) {
		.buttons {
			flex-direction: column-reverse;
		}
	}
</style>
