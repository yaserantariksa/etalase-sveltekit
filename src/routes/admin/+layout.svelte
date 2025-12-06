<script lang="ts">
	import AdminNavbar from '$lib/components/AdminNavbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	import Sidebar from '$lib/components/Sidebar.svelte';

	let { children, data } = $props();
</script>

<div class="w-full min-h-dvh grid grid-cols-[250px_1fr] grid-rows-[80px_1fr_40px] gap-3 relative">
	<AdminNavbar user={data.user}/>
	<main class="col-span-2 px-3">
<div class="h-full grid grid-cols-[240px_1fr] grid-rows-1 gap-4">
	<Sidebar user={data.user} />
	{@render children()}
</div>
	</main>
	<Footer />
</div>
