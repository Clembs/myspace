<script lang="ts">
	import Card from '$lib/components/Card.svelte';

	let { children } = $props();
</script>

<main>
	<Card max-width="500px">
		{@render children()}
	</Card>
</main>

<style lang="scss">
	main {
		display: grid;
		place-items: center;
		height: 100vh;
	}
</style>
