<script lang="ts">
	import type { PageData } from './$types';
	import page_indicator from '$lib/page_indicator';

	$page_indicator = 'Editing';

	export let data: PageData;
</script>

<p>{data.project.id}</p>
