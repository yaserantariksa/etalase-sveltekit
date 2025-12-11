<script lang="ts">
	import HeadComponent from '$lib/components/HeadComponent.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	const title = 'Etalase - Admin Tambah Produk';

  const errors: string[] = []
</script>

<HeadComponent {title} />

<div class="content">
	<h1 class="title-page">Tambah Produk</h1>
	<a href="/admin/produk" class="btn-secondary">Kembali</a>

  <form action="" method="POST" class="max-w-[800px] mx-auto mt-6 space-y-4">
    <TextInput name="name" label="Nama Produk" errors={errors} />
    <TextInput name="name" label="Nama Produk" errors={errors} />
    <TextInput name="name" label="Nama Produk" errors={errors} />
    <button type="submit" class="btn-primary">Simpan</button>
  </form>
</div>
