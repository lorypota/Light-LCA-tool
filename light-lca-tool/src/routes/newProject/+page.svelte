<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
	import { AlertType, ProjectAreaOfProduction } from '$lib/interfaces';
	import page_indicator from '$lib/page_indicator';
	import Icon from '@iconify/svelte';
	import type { ActionData } from './$types';

	$page_indicator = `Creation`;

	const areaOfProductionOptions = Object.values(ProjectAreaOfProduction).filter(
		(value) => typeof value === 'string'
	);

	export let form: ActionData;
</script>

<form class="w-full flex flex-col gap-4" method="POST">
	<Alert
		title="Success"
		visible={form?.success}
		message={form?.message}
		variant={AlertType.success}
	/>

	<h1 class="text-2xl font-bold mb-4">Create a new project</h1>
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
	<div class="flex justify-center">
		<button class="btn variant-filled w-2/3">
			<span><Icon icon="lucide:save" inline={true} /></span>
			<span>Save</span>
		</button>
	</div>
</form>
