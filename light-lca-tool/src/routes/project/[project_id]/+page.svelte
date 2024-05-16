<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	onMount(async () => {
		goto(`${$page.url.pathname}/general`);
	});
</script>
