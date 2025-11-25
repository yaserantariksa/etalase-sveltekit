<script lang="ts">
	import { onMount } from 'svelte';

	let message = $state('Loading...');

	onMount(async () => {
		await fetch('/api/hello-world').then(async (result) => {
			setTimeout(async () => {
				message = await result.text();
			}, 2000);
		});
	});
</script>

<div>
	<h1>{message}</h1>
</div>
