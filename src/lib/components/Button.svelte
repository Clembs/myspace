<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes, HTMLAnchorAttributes } from 'svelte/elements';

	let {
		type = 'button',
		variant = 'primary',
		href,
		disabled = false,
		inline = false,
		children,
		onclick,
		...restProps
	}: (HTMLButtonAttributes | HTMLAnchorAttributes) & {
		type?: 'submit' | 'button';
		variant?: 'primary' | 'secondary';
		href?: string;
		disabled?: boolean;
		inline?: boolean;
		children: Snippet;
		onclick?: () => void;
	} = $props();
</script>

{#if href}
	<a
		class:inline
		class={variant}
		{href}
		aria-disabled={disabled}
		{...restProps as HTMLAnchorAttributes}
	>
		{@render children()}
	</a>
{:else}
	<button
		class:inline
		class={variant}
		{onclick}
		{type}
		{disabled}
		{...restProps as HTMLButtonAttributes}
	>
		{@render children()}
	</button>
{/if}

<style lang="scss">
	a,
	button {
		display: block;
		padding: calc(var(--base-padding) * 0.75) var(--base-padding);
		border-radius: var(--inputs-border-base-radius);
		text-align: center;
		width: 100%;
		font-weight: 500;
		cursor: pointer;
		text-decoration: none;
		user-select: none;

		&.inline {
			display: inline-block;
			width: max-content;
		}

		&.primary {
			background-color: var(--buttons-primary-background-color);
			color: var(--buttons-primary-on-background-color);
			border: var(--inputs-border-width) solid var(--buttons-primary-background-color);

			&:hover {
				opacity: 0.815;
			}
		}

		&.secondary {
			background-color: var(--inputs-background-color);
			color: var(--inputs-on-background-color);
			border: var(--inputs-border-width) solid var(--inputs-border-color);

			&:hover {
				background-color: var(--widgets-background-color-dim);
			}
		}

		&:disabled,
		&[aria-disabled='true'] {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}
</style>
