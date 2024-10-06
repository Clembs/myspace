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
		padding: 0.75rem 1rem;
		border: 1px solid #000;
		border-radius: 0.5rem;
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
			background-color: #000;
			color: #fff;

			&:hover {
				background-color: #2b2b2b;
			}
		}

		&.secondary {
			background-color: #fff;
			color: #000;

			&:hover {
				background-color: #ededed;
			}
		}

		&:disabled,
		&[aria-disabled='true'] {
			opacity: 0.5;
			cursor: not-allowed;
		}
	}
</style>
