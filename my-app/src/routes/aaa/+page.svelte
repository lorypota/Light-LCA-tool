<script lang="ts">
	import { Autocomplete } from '@skeletonlabs/skeleton';
	import type { AutocompleteOption } from '@skeletonlabs/skeleton';

	let inputDemo = '';

	const flavorOptions: AutocompleteOption<string>[] = [
		{ label: 'Vanilla', value: 'vanilla', keywords: 'plain, basic', meta: { healthy: false } },
		{ label: 'Chocolate', value: 'chocolate', keywords: 'dark, white', meta: { healthy: false } },
		{ label: 'Strawberry', value: 'strawberry', keywords: 'fruit', meta: { healthy: true } },
		{
			label: 'Neapolitan',
			value: 'neapolitan',
			keywords: 'mix, strawberry, chocolate, vanilla',
			meta: { healthy: false }
		},
		{ label: 'Pineapple', value: 'pineapple', keywords: 'fruit', meta: { healthy: true } },
		{ label: 'Peach', value: 'peach', keywords: 'fruit', meta: { healthy: true } }
	];

	function onFlavorSelection(event: CustomEvent<AutocompleteOption<string>>): void {
		inputDemo = event.detail.label;
	}
</script>

<input
	class="input"
	type="search"
	name="demo"
	bind:value={inputDemo}
	placeholder="Search project..."
/>
<div class="card h-full w-full max-w-sm overflow-y-auto p-4" tabindex="-1">
	<Autocomplete bind:input={inputDemo} options={flavorOptions} on:selection={onFlavorSelection} />
</div>
