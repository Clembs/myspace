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
			border: var(--inputs-border-width) solid var(--inputs-border-color);
			border-radius: var(--inputs-border-base-radius);
			margin-top: calc(var(--base-gap) * 0.5);

			&.error {
				border-color: #e90000;
				outline: 1px solid #e90000;
			}

			.prefix-icon {
				display: grid;
				place-items: center;
				padding: calc(var(--base-padding) * 0.5);
				border-radius: var(--inputs-border-base-radius) 0 0 var(--inputs-border-base-radius);
				border-right: var(--inputs-border-width) solid var(--inputs-border-color);
				background-color: var(--widgets-background-color-dim);
				color: var(--inputs-on-background-color);
				height: 3rem;
			}

			input {
				padding: calc(var(--base-padding) * 0.75) var(--base-padding);
				border-radius: var(--inputs-border-base-radius);
				width: 100%;
				border: transparent;
				background-color: var(--color-input);
			}

			.prefix-icon + input {
				border-radius: 0 var(--inputs-border-base-radius) var(--inputs-border-base-radius) 0;
			}
		}

		.error {
			color: #e90000;
		}
	}
</style>
