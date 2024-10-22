<script lang="ts">
	import BaseWidget from '$lib/widgets/BaseWidget.svelte';
	import Button from '$lib/components/Button.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import type { User } from '$lib/db/schema/users';
	import type { AboutMeWidget } from '../types';

	let {
		user,
		widget,
		edit = false
	}: {
		user: Partial<User>;
		widget: AboutMeWidget;
		edit?: boolean;
	} = $props();

	let modalOpened = $state(false);
</script>

{#snippet editMenu()}
	<!--TODO: add form action endpoint  -->
	<form class="about-me-edit" method="post">
		<h2>About me</h2>
		<textarea class:big-text={modalOpened} name="about-me" value={widget.content}></textarea>
		<Button type="submit">Save</Button>
	</form>
{/snippet}

<BaseWidget bind:modalOpened {editMenu} {edit} {user} {widget}>
	<div class="about-me">
		<h2>About me</h2>
		{#if !edit}
			<p>{widget.content}</p>
		{:else}
			<TextInput name="about-me" value={widget.content} />
		{/if}
	</div>
</BaseWidget>

<style lang="scss">
	.about-me {
		display: flex;
		flex-direction: column;
		gap: var(--base-gap);
	}
	h2 {
		font-size: 1.25rem;
	}

	.about-me-edit {
		display: flex;
		flex-direction: column;
		gap: var(--base-gap);

		textarea {
			color: var(--color-paragraph);
			border: none;
			outline: none;
			font-size: 0.9rem;
			transition: font-size 200ms;

			&.big-text {
				font-size: 1.1rem;
			}
		}
	}
</style>
