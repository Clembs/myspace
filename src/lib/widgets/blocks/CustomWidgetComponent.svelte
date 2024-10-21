<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { CustomWidget } from '../types';
	import LayoutBlockComponent from './LayoutBlockComponent.svelte';

	let { user, widget }: { user: { id: string }; widget: CustomWidget } = $props();
</script>

<Card>
	<LayoutBlockComponent {user} block={widget} />
</Card>
