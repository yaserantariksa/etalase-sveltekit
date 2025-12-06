<script lang="ts">
	import TextInput from '$lib/components/TextInput.svelte';
	let username = $state('');
	let password = $state('');

	let {form} = $props();
</script>

<div class="content h-full">
	<div class="max-w-98 mx-auto mt-26">
		<h1 class="text-2xl font-bold mb-4">Login</h1>
		<form method="POST" class="space-y-4" action="?/login">
			<TextInput name="username" label="Username" errors={form?.validation.username} bind:value={username} />
			<TextInput name="password" label="Password" type="password" errors={form?.validation.password} bind:value={password} />
			<button type="submit" class="btn-primary">Login</button>
			<!-- <button type="submit" class="btn-secondary" formaction="?/register">Register</button> -->
		</form>
	</div>
</div>
