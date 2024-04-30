<script lang="ts">
	import { ProgressRadial, Table, tableMapperValues } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import type { Project } from '$lib/interfaces';
	import { goto } from '$app/navigation';

	import page_indicator from '$lib/page_indicator';
	$page_indicator = `Selection`;

	export let data: PageData;
	const totalProjects = data.totalProjects;

	const transformToTableSource = (projectsArray: Project[]) => {
		return {
			head: ['name', 'owner', 'creationDate'],
			body: tableMapperValues(projectsArray, ['name', 'owner', 'creationDate']),
			meta: tableMapperValues(projectsArray, ['id']),
			foot: [`Total lines: ${totalProjects}`, '', `<code class="code"></code>`]
		};
	};

	const onSelected = (event: CustomEvent) => {
		const projectID = event.detail[0];
		goto(`/project/${projectID}`);
	};
</script>

{#await data.projectInfos}
	<ProgressRadial>{'Loading projects...'}</ProgressRadial>
{:then projectInfos}
	<div class="overflow-y-scroll max-h-[500px] min-w-[1200px]">
		<Table source={transformToTableSource(projectInfos)} interactive on:selected={onSelected} />
	</div>
{:catch error}
	<p>error loading projects: {error}</p>
{/await}
