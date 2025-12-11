<script>
	import HeadComponent from '$lib/components/HeadComponent.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	const title = 'Admin Kategori';

	let { data } = $props();
</script>

<HeadComponent {title} />

<div class="content">
	<h1 class="title-page">Admin Kategori</h1>
	<a href="/admin/kategori/tambah" class="btn-secondary">Tambah Kategori</a>
	<div class="my-4 border border-gray-400 rounded-lg overflow-hidden">
		<table class="w-full rounded-lg divide-y divide-gray-400">
			<thead class="bg-gray-300">
				<tr class=" divide-x divide-gray-400">
					<th scope="col" class="py-3 w-16">No</th>
					<th scope="col" class="px-6 py-3">Nama Kategori</th>
					<th scope="col" class="px-6 py-3 w-48">Aksi</th>
				</tr>
			</thead>
			<tbody class="">
				{#each data.categoriesData as cat, index}
					<tr class=" divide-x divide-gray-400 hover:bg-gray-200">
						<th scope="row" class="py-3">{index + 1}</th>
						<td class="px-6 py-3">{cat.name}</td>
						<td class="px-6 py-2 flex items-center justify-center gap-3">
							<a href={`/admin/kategori/ubah/${cat.slug}`} class="btn-warning">Edit</a>
							<a href={`/admin/kategori/hapus/${cat.slug}`} class="btn-danger">Hapus</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<Pagination
		totalRow={data.totalRow}
		pageSize={data.pageSize}
		currentPage={data.currentPage}
		totalPages={data.totalPages}
		url="/admin/kategori"
	/>
</div>
