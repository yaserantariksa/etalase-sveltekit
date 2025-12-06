<script lang="ts">
	import type { FlashMessage } from '$lib/flash/flash';
	import { fade } from 'svelte/transition';
	let { flashMessage }: { flashMessage: FlashMessage } = $props();

	function toTitle(text: string): string {
		let title = '';
		switch (text) {
			case 'success':
				title = 'Sukses';
				break;
			case 'danger':
				title = 'Gagal';
				break;
			case 'warning':
				title = 'Peringatan';
				break;
			case 'info':
				title = 'Info';
				break;
			default:
				title = '';
		}
		return title;
	}

	const title = toTitle(flashMessage.type);
</script>

<div class="flash-container" transition:fade={{ duration: 300 }}>
	<div class={`flash-${flashMessage.type}`}>
		<p class="text-xl font-semibold">{title}</p>
		<p>{flashMessage.message}</p>
	</div>
</div>
