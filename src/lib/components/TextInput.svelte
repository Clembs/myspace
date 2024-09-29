<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		type,
		label,
		name,
		required = true,
		value = $bindable(''),
		...restProps
	}: HTMLInputAttributes & {
		label: string;
	} = $props();
</script>

<div class="text-input">
	<label for={name}>
		{label}
	</label>
	<input {type} id={name} {name} {...restProps} bind:value />
</div>

<style lang="scss">
	.text-input {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		width: 100%;

		label {
			font-weight: 600;
			font-size: 0.815rem;
		}

		input {
			padding: 0.75rem 1rem;
			border: 1px solid #000;
			border-radius: 0.5rem;
			background-color: #ededed;
		}
	}
</style>
