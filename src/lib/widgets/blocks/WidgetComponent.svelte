<script lang="ts">
	import type { Widget } from '../types';
	import LayoutBlockComponent from './LayoutBlockComponent.svelte';

	let { widget }: { widget: Widget } = $props();
</script>

<div class="widget">
	<LayoutBlockComponent block={widget} />
</div>

<style lang="scss">
	.widget {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1rem;
		margin: 2rem;
		border-radius: 1rem;
		background-color: #fff;
	}
</style>
