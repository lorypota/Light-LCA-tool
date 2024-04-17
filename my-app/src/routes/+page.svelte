<script lang="ts">
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import { writable } from 'svelte/store';

	export let data: PageData;
	$: ({ projects } = data);

	const selectedProjectId = writable('');

	$: selectedProject = $selectedProjectId ? projects[$selectedProjectId] : null;
	$: isAddingNewProject = $selectedProjectId === '';

	function selectProject(projectId: string) {
		selectedProjectId.set(projectId);
	}

	function selectAddNewProject() {
		selectedProjectId.set('');
	}

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

	let searchFocused = false;
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<input
					class="input w-72"
					type="search"
					name="demo"
					bind:value={inputDemo}
					placeholder="Search project..."
					on:focus={() => (searchFocused = true)}
					on:blur={() => (searchFocused = false)}
				/>
			</svelte:fragment>
			Light LCA tool - Project Selection
			<svelte:fragment slot="trail">
				<button>Logout</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="sidebarLeft">
		<div class="card h-full w-80 max-w-sm overflow-y-auto p-4" tabindex="-1">
			<Autocomplete
				bind:input={inputDemo}
				options={flavorOptions}
				on:selection={onFlavorSelection}
			/>
		</div>
	</svelte:fragment>

	<div class="page-content"></div>

	<svelte:fragment slot="pageFooter">
		<AppBar>Page footer</AppBar>
	</svelte:fragment>
</AppShell>
