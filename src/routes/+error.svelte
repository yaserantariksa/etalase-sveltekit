<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="px-6 py-30 text-center bg-gray-100 rounded-lg">
  <h1 class="text-3xl font-bold">{page.status}: {page.error?.message}</h1>
</div>