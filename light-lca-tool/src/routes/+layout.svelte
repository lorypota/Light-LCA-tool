<script lang="ts">
	import '../app.postcss';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { AppBar, AppShell, storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import page_indicator from '$lib/page_indicator';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<div class="bg-gray-200">
			<AppBar
				gridColumns="grid-cols-3"
				slotDefault="place-self-center"
				slotTrail="place-content-end"
			>
				<svelte:fragment slot="lead">Admin-user panel - Light LCA tool</svelte:fragment>
				<ol class="breadcrumb mt-1">
					{#if $page_indicator != 'Selection'}
						<a class="anchor" href="/">Selection</a>
						<li class="crumb-separator" aria-hidden>&rsaquo;</li>
					{/if}
					<li>{$page_indicator} page</li>
				</ol>
				<svelte:fragment slot="trail">
					<button>Logout</button>
				</svelte:fragment>
			</AppBar>
		</div>
	</svelte:fragment>

	<div class=" h-full">
		<div class="mx-auto flex flex-col justify-center items-center w-3/4 h-full">
			<slot />
		</div>
	</div>

	<svelte:fragment slot="pageFooter">
		<AppBar><div>Page Footer</div></AppBar>
	</svelte:fragment>
</AppShell>
