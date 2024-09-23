<script lang="ts">
	import TextBlockComponent from './TextBlockComponent.svelte';
	import type { LayoutBlock, Widget } from '../types';
	import KeyValueBlockComponent from './KeyValueBlockComponent.svelte';

	export let block: Widget | LayoutBlock;

	let loading = false;
	let data: unknown;
	let error: string;

	async function fetchData() {
		if (!('json_endpoint' in block) || !block.json_endpoint) return;

		loading = true;
		const response = await fetch(block.json_endpoint.replace('{userid}', '1'));

		if (!response.ok) {
			error = await response.text();
			return;
		}

		if (response.headers.get('Content-Type')?.includes('application/json') === false) {
			error = 'Response is not JSON';
			return;
		}

		loading = false;
		data = await response.json();
	}

	fetchData();
</script>

<div class="blocks">
	{#if error}
		<p>{error}</p>
	{:else if loading}
		<p>Loading data...</p>
	{:else}
		{#each block.blocks as b}
			{#if b.type === 'text'}
				<TextBlockComponent block={b} {data} />
			{:else if b.type === 'key_value'}
				<KeyValueBlockComponent block={b} {data} />
			{:else if b.type === 'layout'}
				<svelte:self block={b} />
			{/if}
		{/each}
	{/if}
</div>

<style lang="scss">
	.blocks {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
</style>
