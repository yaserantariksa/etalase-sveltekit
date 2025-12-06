<script lang="ts">
	import { setFlash } from '$lib/flash/flash.js';
	import { onMount } from 'svelte';
	let { data } = $props();

	let message = $state('Loading...');

	onMount(async () => {
		await fetch('/api/hello-world').then(async (result) => {
			setTimeout(async () => {
				message = await result.text();
			}, 2000);
		});
	});
</script>

<div class="content">
	<h1>{message}</h1>
	<p>Database version: {data.version}</p>
	<form method="post">
		<button
			type="submit"
			class="px-4 py-2 my-4 bg-blue-400 text-white rounded-lg hover:bg-blue-500 cursor-pointer"
			>test flash</button
		>
	</form>
</div>
