<script lang="ts">
	import type { User } from '$lib/db/schema/users';
	import type { AnyWidget } from '$lib/widgets/types';
	import type { Snippet } from 'svelte';
	import Card from '$lib/components/Card.svelte';
	import { PencilIcon, Trash2Icon } from 'lucide-svelte';

	let {
		modalOpened = $bindable(false),
		edit = $bindable(false),
		editMenu,
		children
	}: {
		modalOpened?: boolean;
		user: Partial<User>;
		widget: AnyWidget;
		edit?: boolean;
		editMenu: Snippet;
		children: Snippet;
	} = $props();

	let widgetWrapperEl: HTMLDivElement | undefined = $state();
	let widgetDialogEl: HTMLDialogElement | undefined = $state();
	let widgetEditEl: HTMLDivElement | undefined = $state();

	function expandDialog() {
		if (!widgetWrapperEl || !widgetDialogEl) return;

		const rect = widgetWrapperEl.getBoundingClientRect();

		if (!rect) return;

		modalOpened = true;
		widgetDialogEl.showModal();
		// get the dialog to take the dimensions of the widget
		widgetDialogEl.style.transform = 'none';
		widgetDialogEl.style.left = `${rect.x}px`;
		widgetDialogEl.style.top = `${rect.y}px`;
		widgetDialogEl.style.width = `${rect.width}px`;
		widgetDialogEl.style.minHeight = `${rect.height}px`;
		// hide the widget
		widgetWrapperEl.style.opacity = '0.01';

		setTimeout(() => {
			if (!widgetDialogEl) return;
			widgetDialogEl.style.transition =
				'left 200ms, top 200ms, width 200ms, min-height 200ms, transform 200ms';

			const widgetEditRect = widgetEditEl?.getBoundingClientRect();

			// transition to center
			widgetDialogEl.style.left = '50%';
			widgetDialogEl.style.top = '50%';
			widgetDialogEl.style.transform = 'translate(-50%, -50%)';
			widgetDialogEl.style.minHeight = `calc(${widgetEditRect?.height}px + ${
				window.getComputedStyle(widgetDialogEl).padding
			} * 2.5)`;
		}, 10);

		// remove the transition
		widgetDialogEl.style.transition = 'none';
	}

	function closeDialog(ev: Event) {
		ev.preventDefault();

		if (!widgetWrapperEl || !widgetDialogEl) return;

		const rect = widgetWrapperEl.getBoundingClientRect();

		if (!rect) return;

		modalOpened = false;

		setTimeout(() => {
			if (!widgetDialogEl) return;
			widgetDialogEl.style.transition =
				'left 200ms, top 200ms, width 200ms, min-height 200ms, transform 200ms';

			// reset the dialog to the dimensions of the widget
			widgetDialogEl.style.transform = 'none';
			widgetDialogEl.style.left = `${rect.x}px`;
			widgetDialogEl.style.top = `${rect.y}px`;
			widgetDialogEl.style.width = `${rect.width}px`;
			widgetDialogEl.style.minHeight = `${rect.height}px`;
		}, 10);

		// remove the transition and safely close the dialog
		widgetDialogEl.style.transition = 'none';

		setTimeout(() => {
			if (!widgetWrapperEl) return;
			widgetDialogEl?.close();
			// show the widget
			widgetWrapperEl.style.opacity = '1';
		}, 210);
	}
</script>

<dialog
	aria-label="Edit widget"
	bind:this={widgetDialogEl}
	oncancel={(ev) => {
		closeDialog(ev);
	}}
>
	<div class="menu" bind:this={widgetEditEl}>
		{@render editMenu()}
	</div>
</dialog>

<div inert aria-hidden={true} class="dialog-backdrop"></div>

<div class="widget-wrapper" class:editing={edit} bind:this={widgetWrapperEl}>
	<div class="hover-menu">
		<button
			aria-label="Edit widget"
			onclick={() => {
				edit = true;
				expandDialog();
			}}
		>
			<PencilIcon size={20} />
		</button>
		<!-- TODO: Delete widget & "deletable" field -->
		<button aria-label="Delete widget">
			<Trash2Icon size={20} />
		</button>
	</div>

	<Card>
		{@render children()}
	</Card>
</div>

<style lang="scss">
	.dialog-backdrop {
		background-color: transparent;
		transition: background-color 200ms;
		position: fixed;
		inset: 0;
		height: 100vh;
		width: 100vw;
	}

	dialog {
		// opacity: 0;
		gap: var(--base-gap);
		background-color: var(--widgets-background-color);
		padding: var(--base-padding);
		border-radius: var(--widgets-border-base-radius);
		border: var(--widgets-border-width) solid var(--widgets-border-color);
		box-shadow: var(--widgets-box-shadow-x) var(--widgets-box-shadow-y)
			var(--widgets-box-shadow-blur) var(--widgets-box-shadow-color);
		overflow: hidden;
		will-change: transform, width, height, left, top;

		&[open] {
			// opacity: 1;
			display: flex;
			flex-direction: column;
			will-change: transform, width, height, left, top;

			& + .dialog-backdrop {
				z-index: 99;
				background-color: #00000060;

				transition: background-color 100ms;
			}
		}

		&::backdrop {
			background-color: transparent;
		}
	}

	.widget-wrapper {
		position: relative;

		.hover-menu {
			opacity: 0;
			display: flex;
			transition:
				opacity 150ms,
				top 150ms;
			position: absolute;
			top: calc(0px - var(--base-padding) * 1.5);
			left: 50%;
			transform: translateX(-50%);
			background: var(--widgets-background-color);
			padding: calc(var(--base-padding) * 0.25);
			gap: calc(var(--base-gap) * 0.25);
			border: var(--widgets-border-width) solid var(--widgets-border-color);
			border-radius: calc(var(--widgets-border-base-radius));
			box-shadow: var(--widgets-box-shadow-x) var(--widgets-box-shadow-y)
				var(--widgets-box-shadow-blur) var(--widgets-box-shadow-color);

			button {
				border: none;
				border: var(--inputs-border-width) solid var(--inputs-border-color);
				border-radius: calc(var(--inputs-border-base-radius) + var(--base-padding) * 0.25);
				background: var(--widgets-background-color-dim);
				padding: calc(var(--base-padding) * 0.25);
				color: var(--inputs-on-background-color);
				cursor: pointer;
			}
		}

		&:hover .hover-menu,
		&:focus-within .hover-menu,
		&:active .hover-menu {
			transition:
				opacity 150ms,
				top 150ms;
			opacity: 1;
			top: calc(0px - var(--base-padding));
		}
	}
</style>
