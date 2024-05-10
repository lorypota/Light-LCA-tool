<script lang="ts">
	import { goto } from '$app/navigation';
	import { AlertType } from '$lib/interfaces';
	import Icon from '@iconify/svelte';

	export let visible: boolean = false;
	export let title: string = '';
	export let message: string = '';
	export let variant: AlertType = AlertType.error;
	export let redirectURL: string = '';
	export let redirectName: string = '';

	const toggleVisible = () => {
		visible = false;
	};
</script>

{#if visible}
	<aside class="alert {variant}">
		<!-- Icon -->
		<div>
			{#if variant == AlertType.success}
				<Icon icon="lucide:circle-check" />
			{:else}
				<Icon icon="lucide:circle-x" />
			{/if}
		</div>
		<!-- Message -->
		<div class="alert-message">
			<h3 class="h3">{title}</h3>
			<p>{message}</p>
		</div>
		<!-- Actions -->
		<div class="alert-actions">
			<button on:click={toggleVisible}> Dismiss </button>
			{#if redirectURL !== ''}
				<button on:click={() => goto(redirectURL)}>
					Back to {redirectName}.
				</button>
			{/if}
		</div>
	</aside>
{/if}
