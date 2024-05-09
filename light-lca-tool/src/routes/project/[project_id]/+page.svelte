<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	goto(`${$page.url.pathname}/general`);
</script>
