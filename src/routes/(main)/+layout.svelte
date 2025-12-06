<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<div class="w-full min-h-dvh grid grid-cols-[250px_1fr] grid-rows-[80px_1fr_40px] gap-3 relative">
	<Navbar />
	<main class="col-span-2 px-3">
		{@render children()}
	</main>
	<Footer />
</div>
