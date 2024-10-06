<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		'min-width': minWidth,
		'max-width': maxWidth,
		children
	}: {
		'min-width'?: string;
		'max-width'?: string;
		children: Snippet;
	} = $props();
</script>

<div style:--min-width={minWidth} style:--max-width={maxWidth}>
	{@render children()}
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		background-color: #fff;
		min-width: var(--min-width);
		max-width: var(--max-width);
		padding: 1rem;
		padding-top: 1.25rem;
		border-radius: 1rem;
	}
</style>
