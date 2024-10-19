<script lang="ts">
	import AboutMeWidgetComponent from '$lib/widgets/default/AboutMeWidgetComponent.svelte';
	import MusicWidgetComponent from '$lib/widgets/default/MusicWidgetComponent.svelte';
	import ProfileWidgetComponent from '$lib/widgets/default/ProfileWidgetComponent.svelte';
	import type { AnyWidget } from '$lib/widgets/types';

	let { data } = $props();
</script>

{#snippet widgets(widgets: AnyWidget[])}
	{#each widgets as widget}
		<!-- {widget.id}<br /> -->
		{#if widget.id === 'about_me' && 'content' in widget}
			<AboutMeWidgetComponent user={data.user} {widget} />
		{:else if widget.id === 'music' && 'content_url' in widget && widget.content_url}
			<MusicWidgetComponent user={data.user} {widget} />
		{/if}
	{/each}
{/snippet}

<main>
	<div class="column">
		<ProfileWidgetComponent user={data.user} />
		{@render widgets(data.user.widgets[0].sort((a, b) => a.position - b.position))}
	</div>

	<div class="column">
		{@render widgets(data.user.widgets[1].sort((a, b) => a.position - b.position))}
	</div>
</main>

<style lang="scss">
	main {
		display: flex;
		padding: calc(var(--base-padding) * 2);
		gap: var(--base-gap);

		.column {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: var(--base-gap);
		}
	}
</style>
