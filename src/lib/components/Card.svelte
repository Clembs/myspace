<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		'min-width': minWidth,
		'max-width': maxWidth,
		children,
		...props
	}: HTMLAttributes<HTMLDivElement> & {
		'min-width'?: string;
		'max-width'?: string;
		children: Snippet;
	} = $props();
</script>

<div style:--min-width={minWidth} style:--max-width={maxWidth} {...props}>
	{@render children()}
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
		gap: calc(var(--base-gap) * 1.5);
		background-color: var(--widgets-background-color);
		min-width: var(--min-width);
		max-width: var(--max-width);
		padding: var(--base-padding);
		padding-top: calc(var(--base-padding) * 1.5);
		border-radius: var(--widgets-border-base-radius);
		border: var(--widgets-border-width) solid var(--widgets-border-color);
		box-shadow: var(--widgets-box-shadow-x) var(--widgets-box-shadow-y)
			var(--widgets-box-shadow-blur) var(--widgets-box-shadow-color);
	}
</style>
