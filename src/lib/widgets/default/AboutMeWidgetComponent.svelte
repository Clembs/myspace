<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { User } from '$lib/db/schema/users';
	import type { AboutMeWidget } from '../types';

	let {
		widget
	}: {
		user: Partial<User>;
		widget: AboutMeWidget;
	} = $props();
</script>

<Card>
	<div class="about-me">
		<h2>About me</h2>
		<p>{widget.content}</p>
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
