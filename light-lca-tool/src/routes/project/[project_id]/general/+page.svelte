<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import { areProjectsEqual, formatDate } from '$lib/utils';
	import { AlertType, ProjectAreaOfProduction, ProjectStatus, type Project } from '$lib/interfaces';
	import Icon from '@iconify/svelte';
	import Alert from '$lib/components/Alert.svelte';

	export let data: PageData;

	const statusOptions = Object.values(ProjectStatus).filter((value) => typeof value === 'string');
	const areaOfProductionOptions = Object.values(ProjectAreaOfProduction).filter(
		(value) => typeof value === 'string'
	);

	let projectToModify = { ...data.projectWithoutDate };
	let oldProject = { ...data.projectWithoutDate };

	let oldCreationDateString: string = formatDate(data.creationDate ?? new Date());
	let creationDateString: string = formatDate(data.creationDate ?? new Date());

	$: showSaveButton =
		!areProjectsEqual(oldProject, projectToModify) || oldCreationDateString !== creationDateString;

	export let form: ActionData;
</script>

<div class="w-full text-center">
	<form class="w-full flex flex-col gap-4" method="POST">
		<Alert title="Error" visible={form?.error} message={form?.message} variant={AlertType.error} />

		<Alert
			title="Success"
			visible={form?.success}
			message={form?.message}
			variant={AlertType.success}
		/>
		<div class="flex items-center">
			<label class="w-1/3" for="name">Project name:</label>
			<input
				id="name"
				name="name"
				type="text"
				maxlength="36"
				class="input variant-form-material flex-1"
				bind:value={projectToModify.name}
				required
			/>
		</div>
		<div class="flex items-center">
			<label class="w-1/3" for="owner">Owner:</label>
			<input
				id="owner"
				name="owner"
				type="text"
				maxlength="36"
				class="input variant-form-material flex-1"
				bind:value={projectToModify.owner}
				required
			/>
		</div>
		<div class="flex items-center">
			<label class="w-1/3" for="creationDate">Creation date:</label>
			<input
				id="creationDate"
				name="creationDate"
				type="Date"
				class="input variant-form-material flex-1"
				bind:value={creationDateString}
				required
			/>
		</div>
		<div class="flex items-center">
			<label class="w-1/3" for="areaOfProduction">Area of production:</label>
			<select
				id="areaOfProduction"
				name="areaOfProduction"
				class="select variant-form-material flex-1"
				bind:value={projectToModify.areaOfProduction}
			>
				{#each areaOfProductionOptions as areaOfProduction}
					<option value={areaOfProduction}>{areaOfProduction}</option>
				{/each}
			</select>
		</div>
		<div class="flex items-center">
			<label class="w-1/3" for="status">Status:</label>
			<select
				id="status"
				name="status"
				class="select variant-form-material flex-1"
				bind:value={projectToModify.status}
			>
				{#each statusOptions as status}
					<option value={status}>{status}</option>
				{/each}
			</select>
		</div>
		<div class="items-center">
			<button disabled={!showSaveButton} class="btn variant-filled w-1/2">
				<span><Icon icon="lucide:save" inline={true} /></span>
				<span>Save</span>
			</button>
		</div>
	</form>
</div>
