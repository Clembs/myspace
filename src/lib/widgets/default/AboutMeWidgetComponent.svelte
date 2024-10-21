<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import type { User } from '$lib/db/schema/users';
	import type { AboutMeWidget } from '../types';

	let {
		widget,
		edit = false
	}: {
		user: Partial<User>;
		widget: AboutMeWidget;
		edit?: boolean;
	} = $props();
</script>

<Card>
	<div class="about-me">
		<h2>About me</h2>
		{#if !edit}
			<p>{widget.content}</p>
		{:else}
			<TextInput name="about-me" value={widget.content} />
		{/if}
	</div>
</Card>

<style>
	.about-me {
		display: flex;
		flex-direction: column;
		gap: var(--base-gap);
	}
	h2 {
		font-size: 1.25rem;
	}
</style>
