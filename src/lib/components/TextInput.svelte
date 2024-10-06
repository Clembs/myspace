<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		type,
		label,
		error,
		name,
		required = true,
		prefixIcon,
		value = $bindable(''),
		...restProps
	}: HTMLInputAttributes & {
		name: string;
		label: string;
		error?: string;
		prefixIcon?: Snippet<[number]>;
	} = $props();
</script>

<label class="text-input" for={name}>
	<div class="label-text">
		{label}
	</div>

	<div class="input" class:error>
		{#if prefixIcon}
			<div class="prefix-icon">
				{@render prefixIcon(24)}
			</div>
		{/if}
		<input {type} id={name} {name} {...restProps} bind:value />
	</div>

	{#if error}
		<p class="error">{error}</p>
	{/if}
</label>

<style lang="scss">
	.text-input {
		display: flex;
		flex-direction: column;
		width: 100%;

		.label-text,
		.error {
			font-weight: 600;
			font-size: 0.815rem;
		}

		.input {
			display: flex;
			align-items: center;
			border: 1px solid #000;
			border-radius: 0.5rem;
			margin-top: 0.5rem;

			&.error {
				border-color: #e90000;
				outline: 1px solid #e90000;
			}

			.prefix-icon {
				display: grid;
				place-items: center;
				padding: 0.75rem;
				border-radius: 0.5rem 0 0 0.5rem;
				border-right: 1px solid #000;
				background-color: #d9d9d9;
				height: 3rem;
			}

			input {
				padding: 0.75rem 1rem;
				border-radius: 0.5rem;
				width: 100%;
				border: transparent;
				background-color: #ededed;
			}

			.prefix-icon + input {
				border-radius: 0 0.5rem 0.5rem 0;
			}
		}

		.error {
			color: #e90000;
		}
	}
</style>
