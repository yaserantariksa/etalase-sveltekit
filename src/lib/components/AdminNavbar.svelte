<script lang="ts">
	export let user;

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
		{#if user}
			<form action="/logout?/logout" method="POST">
				<button type="submit" class="btn-danger">Logout</button>
			</form>
		{/if}
	</div>
</div>
