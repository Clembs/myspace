<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { PublicUser } from '$lib/db/schema/users';
	import { formatDate } from '$lib/helpers/text';
	import { snowflakeToDate } from '$lib/helpers/users';

	let { user }: { user: PublicUser } = $props();
</script>

<Card>
	<div class="important-stuff">
		<img src={user.avatar} alt="{user.username}'s avatar" />
		<div class="text-bits">
			<h1>{user.displayName || user.username}</h1>
			<p>@{user.username}</p>
		</div>
	</div>

	<div class="less-important-stuff">
		<p>
			Joined on {formatDate(snowflakeToDate(user.id), 'en-US')}
			{#if user.pronouns}
				&bull; {user.pronouns}
			{/if}
		</p>
		{#if user.status === 'online'}
			<p>🟢 Currently online</p>
		{:else if user.status === 'offline'}
			<p>⚫ Last online: {formatDate(user.last_online, 'en-US')}</p>
		{/if}
	</div>
</Card>

<style lang="scss">
	.important-stuff {
		display: flex;
		gap: var(--base-gap);
		align-items: center;

		img {
			width: var(--avatar-size);
			height: var(--avatar-size);
			border-radius: var(--avatar-border-radius);
		}

		.text-bits {
			display: flex;
			flex-direction: column;
			gap: calc(var(--base-gap) / 4);

			h1 {
				font-size: 1.5rem;
			}
		}
	}

	.less-important-stuff {
		display: flex;
		flex-direction: column;
		gap: calc(var(--base-gap) / 2);
	}
</style>
