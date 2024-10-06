<script lang="ts">
	import { replacePlaceholders } from '../placeholders';
	import type { TextBlock } from '../types';

	let {
		block,
		data = undefined
	}: {
		block: TextBlock;
		data?: unknown;
	} = $props();
</script>

{#if block.text_type === 'paragraph'}
	<p>{replacePlaceholders(block.content, data)}</p>
{:else if block.text_type === 'subtext'}
	<span class="subtext">
		{replacePlaceholders(block.content, data)}
	</span>
{:else}
	<svelte:element this={block.text_type}>
		{replacePlaceholders(block.content, data)}
	</svelte:element>
{/if}
