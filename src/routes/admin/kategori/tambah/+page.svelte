<script lang="ts">
	import HeadComponent from '$lib/components/HeadComponent.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	const title = 'Tambah Kategori';

	let { form } = $props();
	let name: string | undefined = $state('');

	if (!form?.success) {
		name = form?.data.name;
	}

	const errors: string[] | undefined = form?.valdation?.name;
</script>

<HeadComponent {title} />

<div class="content">
	<h1 class="title-page">{title}</h1>
	<a href="/admin/kategori" class="btn-secondary">Kembali</a>

	<form action="" method="POST" class="max-w-[800px] mx-auto mt-6 space-y-4">
		<TextInput name="name" label="Nama Kategori" {errors} bind:value={name} />
		<button type="submit" class="btn-primary">Simpan</button>
	</form>
</div>
