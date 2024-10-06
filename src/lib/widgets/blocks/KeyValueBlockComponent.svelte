<script lang="ts">
	import { replacePlaceholders } from '../placeholders';
	import type { KeyValueBlock } from '../types';

	let {
		block,
		data = undefined
	}: {
		block: KeyValueBlock;
		data?: unknown;
	} = $props();
</script>

<div class="key-value-block">
	<div class="heading">
		{replacePlaceholders(block.key, data)}
	</div>
	<p class="subtext">
		{replacePlaceholders(block.value, data)}
	</p>
</div>

<style lang="scss">
	.key-value-block {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
</style>
