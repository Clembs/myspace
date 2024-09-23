<script lang="ts">
	import WidgetComponent from '$lib/widgets/blocks/WidgetComponent.svelte';
	import type { Widget } from '$lib/widgets/types';

	const sampleWidget: Widget = {
		id: 'friends',
		position: 0,
		blocks: [
			{
				type: 'text',
				content: 'Personal info',
				editable: false,
				text_type: 'h2'
			},
			{
				type: 'layout',
				json_endpoint: 'https://jsonplaceholder.org/users/{userid}',
				blocks: [
					{
						type: 'key_value',
						key: 'Name',
						value: '{data.firstname} {data.lastname}'
					},
					{
						type: 'key_value',
						key: 'Email',
						value: '{data.email}'
					},
					{
						type: 'key_value',
						key: 'Phone',
						value: '{data.phone}'
					},
					{
						type: 'key_value',
						key: 'Website',
						value: '{data.website}'
					}
				]
			}
		]
	};
</script>

<WidgetComponent widget={sampleWidget} />
