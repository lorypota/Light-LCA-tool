<script lang="ts">
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;
	$: ({ projectInfos, projectNum } = data);

	import Datatable from '$lib/components/server/Datatable.svelte';
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

	<div class="px-12 py-7">
		<Datatable {projectInfos} {projectNum} />
	</div>

	<svelte:fragment slot="pageFooter">
		<div class="bg-gray-400">
			<AppBar>Page footer</AppBar>
		</div>
	</svelte:fragment>
</AppShell>
