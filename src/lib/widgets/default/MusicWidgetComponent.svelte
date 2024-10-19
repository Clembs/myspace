<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { User } from '$lib/db/schema/users';
	import type { MusicWidget } from '../types';

	let {
		widget
	}: {
		user: Partial<User>;
		widget: MusicWidget;
	} = $props();
</script>

<Card>
	<div class="music-widget">
		<div class="heading">
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<mask
					id="mask0_1_290"
					style="mask-type:alpha"
					maskUnits="userSpaceOnUse"
					x="0"
					y="0"
					width="24"
					height="24"
				>
					<rect width="24" height="24" fill="#D9D9D9" />
				</mask>
				<g mask="url(#mask0_1_290)">
					<path
						d="M10 21C8.9 21 7.95833 20.6083 7.175 19.825C6.39167 19.0417 6 18.1 6 17C6 15.9 6.39167 14.9583 7.175 14.175C7.95833 13.3917 8.9 13 10 13C10.3833 13 10.7375 13.0458 11.0625 13.1375C11.3875 13.2292 11.7 13.3667 12 13.55V3H18V7H14V17C14 18.1 13.6083 19.0417 12.825 19.825C12.0417 20.6083 11.1 21 10 21Z"
						fill="#1C1B1F"
					/>
				</g>
			</svg>
			{widget.title}
		</div>

		{#if widget.content_type === 'spotify'}
			<iframe
				title="Spotify embed"
				style="border-radius:12px"
				src="https://open.spotify.com/embed/track/{widget.content_url}?utm_source=generator"
				width="100%"
				height="80"
				frameBorder="0"
				allowfullscreen
				allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
				loading="lazy"
				class="spotify-embed"
			></iframe>
		{/if}
		{#if widget.content_type?.startsWith('audio/')}
			<audio controls>
				<source src={widget.content_url} type={widget.content_type} />
				Your browser does not support the audio element.
			</audio>
		{/if}
	</div>
</Card>

<style lang="scss">
	.music-widget {
		display: flex;
		flex-direction: column;
		gap: calc(var(--base-gap) / 2);

		.heading {
			display: flex;
			gap: calc(var(--base-gap) / 2);
		}

		.spotify-embed {
			border-radius: 12px;
			height: 80px;
		}
	}
</style>
