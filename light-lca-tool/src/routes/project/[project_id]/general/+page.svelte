<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { ProjectStatus, type Project } from '$lib/interfaces';
	import Icon from '@iconify/svelte';

	export let data: PageData;
	let projectToModify: Project = { ...data.project };

	const statusOptions = Object.values(ProjectStatus).filter((value) => typeof value === 'string');

	let showSaveButton = false;

	const areProjectsEqual = (project1: Project, project2: Project): boolean => {
		return (
			project1.name === project2.name &&
			project1.owner === project2.owner &&
			project1.creationDate === project2.creationDate &&
			project1.areaOfProduction === project2.areaOfProduction &&
			project1.status === project2.status &&
			project1.efficiency === project2.efficiency &&
			project1.electricityUse === project2.electricityUse &&
			project1.id === project2.id &&
			project1.useEnergyMix === project2.useEnergyMix
		);
	};

	$: {
		showSaveButton = !areProjectsEqual(data.project, projectToModify);
	}

	const saveChanges = () => {
		console.log('Old: ', data.project);
		console.log('New: ', projectToModify);
	};

	export let form: ActionData;
</script>

<div class="w-full text-center">
	<form class="w-full flex flex-col gap-4" method="POST">
		<div class="flex items-center">
			<label class="w-1/3" for="name">Project name:</label>
			<input
				id="name"
				class="input variant-form-material flex-1"
				bind:value={projectToModify.name}
			/>
		</div>
		<div class="flex items-center">
			<label class="w-1/3" for="owner">Owner:</label>
			<input
				id="owner"
				class="input variant-form-material flex-1"
				bind:value={projectToModify.owner}
			/>
		</div>
		<div class="flex items-center">
			<label class="w-1/3" for="creationDate">Creation date:</label>
			<input
				id="creationDate"
				class="input variant-form-material flex-1"
				bind:value={projectToModify.creationDate}
			/>
		</div>
		<div class="flex items-center">
			<label class="w-1/3" for="areaOfProduction">Area of production:</label>
			<input
				id="areaOfProduction"
				class="input variant-form-material flex-1"
				bind:value={projectToModify.areaOfProduction}
			/>
		</div>
		<div class="flex items-center">
			<label class="w-1/3" for="projectStatus">Project status:</label>
			<select
				id="projectStatus"
				class="select variant-form-material flex-1"
				bind:value={projectToModify.status}
			>
				{#each statusOptions as status}
					<option value={status}>{status}</option>
				{/each}
			</select>
		</div>
		{#if showSaveButton}
			<div class="items-center">
				<button type="button" class="btn variant-filled w-1/2">
					<span><Icon icon="lucide:save" inline={true} /></span>
					<span>Save</span>
				</button>
			</div>
		{/if}
	</form>
	{#if form?.status === 400}
		<aside class="alert variant-filled-error">
			<!-- Icon -->
			<div>(icon)</div>
			<!-- Message -->
			<div class="alert-message">
				<h3 class="h3">Status 400</h3>
				<p>{form?.body}</p>
			</div>
		</aside>
	{/if}
	{#if form?.status === 200}
		<aside class="alert variant-filled-success">
			<!-- Icon -->
			<div>(icon)</div>
			<!-- Message -->
			<div class="alert-message">
				<h3 class="h3">Status 200</h3>
				<p>{form?.body}</p>
			</div>
		</aside>
	{/if}
</div>
