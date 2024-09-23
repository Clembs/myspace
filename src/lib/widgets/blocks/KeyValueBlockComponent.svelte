<script lang="ts">
	import { replacePlaceholders } from '../placeholders';
	import type { KeyValueBlock } from '../types';

	export let block: KeyValueBlock;
	export let data: unknown = undefined;
</script>

<div class="key-value-block">
	<div class="heading">
		{replacePlaceholders(block.key, data)}
	</div>
	<div class="subtext">
		{replacePlaceholders(block.value, data)}
	</div>
</div>

<style lang="scss">
	.key-value-block {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}
</style>
