<script lang="ts">
	import HeadComponent from '$lib/components/HeadComponent.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	const title = 'Hapus Kategori';

	let { data, form } = $props();
	let name = $state(data.category.name);
	const errors = form?.validation.name;
</script>

<HeadComponent {title} />

<div class="content">
	<h1 class="title-page">{title}</h1>
	<a href="/admin/kategori" class="btn-secondary">Kembali</a>
	<form action="" method="POST" class="max-w-[800px] mx-auto mt-6 space-y-4">
		<TextInput name="name" label="Nama Kategori" {errors} bind:value={name} isReadonly={true} />
		<button type="submit" class="btn-danger">Hapus</button>
	</form>
</div>
