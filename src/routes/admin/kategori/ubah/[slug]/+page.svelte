<script lang="ts">
	import HeadComponent from '$lib/components/HeadComponent.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	const title = 'Ubah Kategori';

	let { data, form } = $props();
	let name = $state(data.category.name);
	let slug = $state(data.category.slug);
	const errors: string[] | undefined = form?.validation.name;
</script>

<HeadComponent {title} />

<div class="content">
	<h1 class="title-page">{title}</h1>
	<a href="/admin/kategori" class="btn-secondary">Kembali</a>
	<form action="" method="POST" class="max-w-[800px] mx-auto mt-6 space-y-4">
		<div class="hidden">
			<TextInput name="slug" label="Slug Kategori" bind:value={slug} isReadonly={true} />
		</div>
		<TextInput name="name" label="Nama Kategori" {errors} bind:value={name} />
		<button type="submit" class="btn-danger">Ubah</button>
	</form>
</div>
