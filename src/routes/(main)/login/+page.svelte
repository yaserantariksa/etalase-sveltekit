<script lang="ts">
	import HeadComponent from "$lib/components/HeadComponent.svelte";
	import TextInput from '$lib/components/TextInput.svelte';

  const title = "Etalase - Login";

	let username: string | undefined = $state('');
	let password = $state('');

	let {form} = $props();
	if (!form?.success) {
		username = form?.data.username
	}


</script>

<HeadComponent title={title}/>

<div class="content h-full">
	<div class="max-w-98 mx-auto mt-26">
		<h1 class="title-page">Login</h1>
		<form method="POST" class="space-y-4" action="?/login">
			<TextInput name="username" label="Username" errors={form?.validation.username} bind:value={username} />
			<TextInput name="password" label="Password" type="password" errors={form?.validation.password} bind:value={password} />
			<button type="submit" class="btn-primary">Login</button>
			<!-- <button type="submit" class="btn-secondary" formaction="?/register">Register</button> -->
		</form>
	</div>
</div>
