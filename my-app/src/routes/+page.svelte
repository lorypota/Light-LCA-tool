<script lang="ts">
	import { AppShell, AppBar, ProgressRadial, Table } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<AppShell>
	<svelte:fragment slot="header">
		<div class="bg-gray-200">
			<AppBar
				gridColumns="grid-cols-3"
				slotDefault="place-self-center"
				slotTrail="place-content-end"
			>
				<svelte:fragment slot="lead">Admin-user pane</svelte:fragment>
				Light LCA tool - Project Selection
				<svelte:fragment slot="trail">
					<button>Logout</button>
				</svelte:fragment>
			</AppBar>
		</div>
	</svelte:fragment>

	<div class="w-3/4 mx-auto flex flex-col justify-center items-center min-h-screen">
		{#await data.projectTable}
			Loading projects...
			<ProgressRadial />
		{:then projectTable}
			<Table source={projectTable} />
		{:catch error}
			<p>error loading projects: {error}</p>
		{/await}
	</div>

	<svelte:fragment slot="pageFooter">
		<div class="bg-gray-400">
			<AppBar>Page footer</AppBar>
		</div>
	</svelte:fragment>
</AppShell>
