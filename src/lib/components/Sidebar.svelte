<script lang="ts">
	let { user } = $props();
	const menuItems = [
		{
			href: '/admin/',
			label: 'Dashboard'
		},
		{
			href: '/admin/produk',
			label: 'Produk'
		},
		{
			href: '/admin/kategori',
			label: 'Kategori'
		},
		{
			href: '/admin/artikel',
			label: 'Artikel'
		}
	];
	const settingItems = [
		{
			href: '/admin/users',
			label: 'User'
		},
		{
			href: '/admin/umum',
			label: 'Pengaturan Umum'
		}
	];
</script>

<div class="p-3 h-full rounded-lg bg-gray-100">
	{#if user}
		<div class="pt-2 pb-4 text-center text-2xl">Hi, {user.username}</div>
	{/if}
	<div class="sidebar-title">MENU</div>
	<div class="flex flex-col px-4 mb-2">
		{#each menuItems as item}
			<a href={item.href} class="sidebar-item">{item.label}</a>
		{/each}
	</div>
	<div class="sidebar-title">PENGATURAN</div>
	<div class="flex flex-col px-4">
		{#each settingItems as item}
			<a href={item.href} class="sidebar-item">{item.label}</a>
		{/each}
	</div>
</div>
