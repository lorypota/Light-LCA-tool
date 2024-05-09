<script lang="ts">
	import { page } from '$app/stores';
	import { TabGroup, TabAnchor } from '@skeletonlabs/skeleton';
	import page_indicator from '$lib/page_indicator';
	import Icon from '@iconify/svelte';

	$page_indicator = `Editing`;

	function getUrlPath(path: string) {
		var selectedPath: Array<string> = $page.url.pathname.split('/');
		const lastItem: string = selectedPath[selectedPath.length - 1];
		if (lastItem === 'general' || lastItem === 'composition' || lastItem === 'assessment') {
			selectedPath.pop();
		}
		selectedPath.push(path);
		return selectedPath.join('/');
	}
</script>

<div class="w-full text-center pb-4">
	<TabGroup justify="justify-center">
		<TabAnchor href={getUrlPath('general')} selected={$page.url.pathname.endsWith('general')}>
			<div class="flex items-center">
				<Icon icon="lucide:settings" inline={true} />
				<span>&nbsp; General</span>
			</div>
		</TabAnchor>
		<TabAnchor
			href={getUrlPath('composition')}
			selected={$page.url.pathname.endsWith('composition')}
		>
			<div class="flex items-center">
				<Icon icon="lucide:edit" inline={true} />
				<span>&nbsp; Composition</span>
			</div>
		</TabAnchor>
		<TabAnchor href={getUrlPath('assessment')} selected={$page.url.pathname.endsWith('assessment')}>
			<div class="flex items-center">
				<Icon icon="lucide:pie-chart" inline={true} />
				<span>&nbsp; Assessment</span>
			</div>
		</TabAnchor>
	</TabGroup>
</div>

<slot />
