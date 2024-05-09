<script lang="ts">
	import { ProjectAreaOfProduction, ProjectStatus } from '$lib/interfaces';
	import page_indicator from '$lib/page_indicator';
	import Icon from '@iconify/svelte';

	$page_indicator = `Creation`;

	const areaOfProductionOptions = Object.values(ProjectAreaOfProduction).filter(
		(value) => typeof value === 'string'
	);
</script>

<h1 class="text-2xl font-bold mb-4">Create a new project</h1>

<form class="w-full flex flex-col gap-4" method="POST">
	<div class="flex items-center">
		<label class="w-1/3" for="name">Project name:</label>
		<input
			id="name"
			name="name"
			type="text"
			maxlength="36"
			class="input variant-form-material flex-1"
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
			required
		/>
	</div>
	<div class="flex items-center">
		<label class="w-1/3" for="areaOfProduction">Area of production:</label>
		<select
			id="areaOfProduction"
			name="areaOfProduction"
			class="select variant-form-material flex-1"
		>
			{#each areaOfProductionOptions as areaOfProduction}
				<option value={areaOfProduction}>{areaOfProduction}</option>
			{/each}
		</select>
	</div>
	<input type="text" name="status" value={ProjectStatus.Draft} hidden />
	<div class="flex justify-center">
		<button class="btn variant-filled w-2/3">
			<span><Icon icon="lucide:save" inline={true} /></span>
			<span>Save</span>
		</button>
	</div>
</form>
