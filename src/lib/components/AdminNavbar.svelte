<script lang="ts">
	export let user;

	const navLinks = [
		{ href: '/produk', label: 'Produk' },
		{ href: '/kategori', label: 'Kategori' },
		{ href: '/artikel', label: 'Artikel' },
		{ href: '/tentang-kami', label: 'Tentang Kami' },
		{ href: '/kontak', label: 'Kontak' }
	];

</script>

<div class="w-full h-full ps-3 pt-3">
	<a href="/" class="w-full h-full brand flex items-center justify-center bg-gray-100 rounded-lg"
		>etalase</a
	>
</div>
<div class="w-full h-full pe-3 pt-3">
	<div
		class="w-full h-full pe-3 gap-4 flex items-center justify-end bg-gray-100 text-lg font-semibold"
	>
		<nav class="flex items-center justify-end gap-4">
			{#each navLinks as link}
				<a href={link.href} class="hidden lg:block hover:text-teal-700">{link.label}</a>
			{/each}
		</nav>
		{#if user}
			<a href="/admin" class="cursor-pointer">Hi, {user.username}</a>
			<form action="/logout?/logout" method="POST">
				<button type="submit" class="cursor-pointer">Logout</button>
			</form>
		{/if}
	</div>
</div>
