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
	import { page } from '$app/stores';

	export let data: PageData;
	const totalProjects = data.totalProjects;

	let paginationSettings = {
		page: Number($page.url.searchParams.get('skip')) || 0,
		limit: Number($page.url.searchParams.get('limit')) || 10,
		size: totalProjects,
		amounts: [10, 25, 50]
	} satisfies PaginationSettings;

	$: paginationSettings.size = totalProjects;

	const transformToTableSource = (projectsArray: Project[]) => {
		return {
			head: ['name', 'owner', 'creationDate'],
			body: tableMapperValues(projectsArray, ['name', 'owner', 'creationDate']),
			meta: tableMapperValues(projectsArray, ['id']),
			foot: [`Total lines: ${totalProjects}`, '', `<code class="code"></code>`]
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
		updateUrlState();
	};

	const updateUrlState = () => {
		const offset = paginationSettings.page * paginationSettings.limit;
		const limit = paginationSettings.limit;
		goto(`?skip=${offset}&limit=${limit}`);
	};
</script>

{#await data.projectInfos}
	<ProgressRadial>{'Loading projects...'}</ProgressRadial>
{:then projectInfos}
	<div class="overflow-y-scroll max-h-[800px] min-w-[1200px]">
		<Table source={transformToTableSource(projectInfos)} interactive on:selected={onSelected} />
	</div>
	<Paginator
		bind:settings={paginationSettings}
		showFirstLastButtons={false}
		showPreviousNextButtons={true}
		showNumerals
		maxNumerals={1}
		on:page={onPageChange}
		on:amount={onAmountChange}
	/>
{:catch error}
	<!-- TODO: display error with Alert component -->
	<p>error loading projects: {error.message}</p>
{/await}
