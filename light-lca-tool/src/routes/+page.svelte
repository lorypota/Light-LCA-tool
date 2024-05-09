<script lang="ts">
	import {
		Paginator,
		ProgressRadial,
		Table,
		tableMapperValues,
		type PaginationSettings
	} from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import type { Project } from '$lib/interfaces';
	import { goto } from '$app/navigation';

	import page_indicator from '$lib/page_indicator';
	$page_indicator = `Selection`;
	import { page } from '$app/stores';

	export let data: PageData;
	$: totalProjects = data.totalProjects;

	$: dataProjectInfos = data.projectInfos;

	let paginationSettings = {
		page: Number($page.url.searchParams.get('skip')) || 0,
		limit: Number($page.url.searchParams.get('limit')) || 10,
		size: totalProjects,
		amounts: [10, 25, 50]
	} satisfies PaginationSettings;

	$: paginationSettings.size = totalProjects;

	let searchString: string = $page.url.searchParams.get('search') || '';
	let selectSearch: string = $page.url.searchParams.get('filter') || 'name';

	const transformToTableSource = (projectsArray: Project[]) => {
		return {
			head: ['name', 'owner', 'creationDate', 'areaOfProduction'],
			body: tableMapperValues(projectsArray, ['name', 'owner', 'creationDate', 'areaOfProduction']),
			meta: tableMapperValues(projectsArray, ['id']),
			foot: [`Total lines: ${totalProjects}`]
		};
	};

	const onSelected = (e: CustomEvent) => {
		const projectID = e.detail[0];
		goto(`/project/${projectID}`);
	};

	const onPageChange = (e: CustomEvent) => {
		paginationSettings.page = e.detail;
		updateUrlState();
	};

	const onAmountChange = (e: CustomEvent) => {
		paginationSettings.limit = e.detail;
		paginationSettings.page = 0;
		updateUrlState();
	};

	const updateUrlState = (resetPagination: boolean = false) => {
		let searchParams: Array<string> = [];

		if (!resetPagination) {
			const limit = paginationSettings.limit;
			if (limit > 0) searchParams.push(`limit=${limit}`);

			const offset = paginationSettings.page * paginationSettings.limit;
			if (offset > 0) searchParams.push(`skip=${offset}`);
		}

		if (searchString.length > 0) {
			searchParams.push(`search=${searchString}`);
			searchParams.push(`filter=${selectSearch}`);
		}

		goto(`?${searchParams.join('&')}`);
	};
</script>

{#await dataProjectInfos}
	<ProgressRadial>{'Loading projects...'}</ProgressRadial>
{:then projectInfos}
	<div class="w-full min-w-[500px]">
		<div class="flex flex-row justify-evenly items-center">
			<!-- TODO: improve UI by putting select inside of input text search -->

			<select class="selectSearch" bind:value={selectSearch}>
				<option value="name">Name</option>
				<option value="id">ID</option>
				<option value="owner">Owner</option>
				<option value="creationDate">Creation date</option>
			</select>

			<div class="w-1/3 input-group input-group-divider grid-cols-[auto_1fr_auto]">
				<div class="input-group-shim"><!-- <Icon icon="lucide:search" /> -->🔍</div>
				<input type="search" placeholder="Filter ..." bind:value={searchString} />
				<button class="variant-filled-secondary" on:click={() => updateUrlState(true)}>
					Submit
				</button>
			</div>
		</div>

		<br />

		<Table source={transformToTableSource(projectInfos)} interactive on:selected={onSelected} />

		<br />

		<Paginator
			bind:settings={paginationSettings}
			showFirstLastButtons={false}
			showPreviousNextButtons={true}
			showNumerals
			maxNumerals={1}
			on:page={onPageChange}
			on:amount={onAmountChange}
		/>
	</div>
{:catch error}
	<!-- TODO: display error with Alert component -->
	<p>error loading projects: {error.message}</p>
{/await}
