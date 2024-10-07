<script lang="ts">
	import { enhance } from '$app/forms';
	import { replaceState } from '$app/navigation';
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';

	let { data, form } = $props();
</script>

{#snippet emailIcon(size: number)}
	<svg
		width={size}
		height={size}
		viewBox="0 0 22 22"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M19.25 4.125H2.75C2.56766 4.125 2.3928 4.19743 2.26386 4.32636C2.13493 4.4553 2.0625 4.63016 2.0625 4.8125V16.5C2.0625 16.8647 2.20737 17.2144 2.46523 17.4723C2.72309 17.7301 3.07283 17.875 3.4375 17.875H18.5625C18.9272 17.875 19.2769 17.7301 19.5348 17.4723C19.7926 17.2144 19.9375 16.8647 19.9375 16.5V4.8125C19.9375 4.63016 19.8651 4.4553 19.7361 4.32636C19.6072 4.19743 19.4323 4.125 19.25 4.125ZM11 11.4426L4.51773 5.5H17.4823L11 11.4426ZM8.48289 11L3.4375 15.6243V6.3757L8.48289 11ZM9.50039 11.9324L10.5316 12.882C10.6585 12.9985 10.8244 13.0631 10.9966 13.0631C11.1687 13.0631 11.3346 12.9985 11.4615 12.882L12.4927 11.9324L17.4771 16.5H4.51773L9.50039 11.9324ZM13.5171 11L18.5625 6.37484V15.6252L13.5171 11Z"
			fill="currentColor"
		/>
	</svg>
{/snippet}

<header>
	<div class="eyebrow">Create an account - Step 2/3</div>
	<h1>Verify your email address</h1>

	<p>To combat spam and secure your account, your email address needs to be verified.</p>
</header>

<form
	use:enhance={() =>
		({ update }) => {
			update({ reset: false });
		}}
	action="?/sendOTP&type=register"
	method="post"
>
	<TextInput
		name="email"
		oninput={() => replaceState(`?username=${data.username}&email=${data.email}`, {})}
		prefixIcon={emailIcon}
		type="email"
		label="Email address"
		placeholder="clembs@clembs.com"
		tabindex={1}
		autofocus
		bind:value={data.email}
		error={form?.message}
	/>

	<div class="buttons">
		<Button
			type="submit"
			variant="secondary"
			href="/register?username={data.username}{data.email && `&email=${data.email}`}"
			tabindex={3}
		>
			Back
		</Button>

		<Button type="submit" tabindex={2}>Send verification code</Button>
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
