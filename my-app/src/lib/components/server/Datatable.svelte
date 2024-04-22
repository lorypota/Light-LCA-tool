<script lang="ts">
	//Import local datatable components
	import ThSort from '$lib/components/server/ThSort.svelte';
	import Search from '$lib/components/server/Search.svelte';
	import RowCount from '$lib/components/server/RowCount.svelte';
	import Pagination from '$lib/components/server/Pagination.svelte';

	//Import handler & Types from SSD remote
	import { DataHandler, RowsPerPage } from '@vincjo/datatables/remote';
	import type { Row } from '@vincjo/datatables/remote';

	export let projectInfos: Row[], projectNum: number;

	//Init data handler - SERVER
	const handler = new DataHandler<Row>(projectInfos, {
		rowsPerPage: projectInfos.length,
		totalRows: projectNum
	});

	const displayedRows = handler.getRows();
</script>

<div class="overflow-y-auto space-y-4">
	<header class="flex justify-between">
		<Search {handler} />
	</header>
	<table class="table table-hover table-compact w-full table-auto">
		<thead>
			<tr>
				<ThSort {handler} orderBy="_id">ID</ThSort>
				<ThSort {handler} orderBy="name">Name</ThSort>
				<ThSort {handler} orderBy="owner">Owner</ThSort>
				<ThSort {handler} orderBy="creationDate">Creation date</ThSort>
			</tr>
			<tr> </tr>
		</thead>
		<tbody>
			{#each $displayedRows as row}
				<tr>
					<td>{row._id}</td>
					<td>{row.name}</td>
					<td>{row.owner}</td>
					<td>{row.creationDate}</td>
				</tr>
			{/each}
		</tbody>
	</table>
	<footer class="flex justify-between">
		<RowCount {handler} />
		<Pagination {handler} />
	</footer>
</div>
