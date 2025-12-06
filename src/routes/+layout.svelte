<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import type { FlashMessage } from '$lib/flash/flash.js';
	import FlashComponent from '$lib/components/FlashComponent.svelte';

	let { children, data } = $props();

	let flashMessage = $state<FlashMessage | null>(null);

	$effect(() => {
		flashMessage = data.etalaseFlash ?? null;
		setTimeout(() => {
			flashMessage = null;
		}, 3000);
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

	{#if flashMessage}
		<FlashComponent {flashMessage} />
	{/if}

{@render children()}
