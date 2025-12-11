<script lang="ts">
	let { totalRow, pageSize, currentPage, totalPages, url } = $props();
	const firstItemNumber = (currentPage - 1) * pageSize + 1;
	const lastItemNumber = currentPage * pageSize > totalRow ? totalRow : currentPage * pageSize;

</script>

<div class="flex items-center justify-between border-t border-white/10 px-3">
	<div class="flex flex-1 justify-between sm:hidden">
		{#if currentPage === 1}
			<span
				aria-label="Previous page"
				class="relative inline-flex items-center rounded-md border border-black/10 bg-black/5 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-black/10"
			>
				<svg
					viewBox="0 0 20 20"
					fill="currentColor"
					data-slot="icon"
					aria-hidden="true"
					class="size-5"
				>
					<path
						d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
						clip-rule="evenodd"
						fill-rule="evenodd"
					/>
				</svg>
			</span>
		{:else}
			<a
				href={`${url}?page=${currentPage - 1}`}
				aria-label="Previous page"
				class="relative inline-flex items-center rounded-md border border-black/10 bg-black/5 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-black/10"
			>
				<svg
					viewBox="0 0 20 20"
					fill="currentColor"
					data-slot="icon"
					aria-hidden="true"
					class="size-5"
				>
					<path
						d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
						clip-rule="evenodd"
						fill-rule="evenodd"
					/>
				</svg>
			</a>
		{/if}
		{#if totalPages === currentPage}
			<span
				aria-label="Next Page"
				class="relative inline-flex items-center rounded-md border border-black/10 bg-black/5 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-black/10"
			>
				<svg
					viewBox="0 0 20 20"
					fill="currentColor"
					data-slot="icon"
					aria-hidden="true"
					class="size-5"
				>
					<path
						d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
						clip-rule="evenodd"
						fill-rule="evenodd"
					/>
				</svg>
			</span>
		{:else}
			<a
				href={`${url}?page=${currentPage + 1}`}
				aria-label="Next Page"
				class="relative inline-flex items-center rounded-md border border-black/10 bg-black/5 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-black/10"
			>
				<svg
					viewBox="0 0 20 20"
					fill="currentColor"
					data-slot="icon"
					aria-hidden="true"
					class="size-5"
				>
					<path
						d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
						clip-rule="evenodd"
						fill-rule="evenodd"
					/>
				</svg>
			</a>
		{/if}
	</div>
	<div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
		<div>
			<p class="text-sm text-gray-700">
				Showing
				<span class="font-medium">{firstItemNumber}</span>
				to
				<span class="font-medium">{lastItemNumber}</span>
				of
				<span class="font-medium">{totalRow}</span>
				results
			</p>
		</div>
		<div>
			<nav aria-label="Pagination" class="isolate inline-flex -space-x-px rounded-md">
				<!-- PREVIOUS PAGE -->
				{#if currentPage === 1}
					<span class="previous-page">
						<span class="sr-only">Previous</span>
						<svg
							viewBox="0 0 20 20"
							fill="currentColor"
							data-slot="icon"
							aria-hidden="true"
							class="size-5"
						>
							<path
								d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
								clip-rule="evenodd"
								fill-rule="evenodd"
							/>
						</svg>
					</span>
				{:else}
					<a
						href={`${url}?page=${currentPage === 1 ? 1 : currentPage - 1}`}
						class="previous-page"
					>
						<span class="sr-only">Previous</span>
						<svg
							viewBox="0 0 20 20"
							fill="currentColor"
							data-slot="icon"
							aria-hidden="true"
							class="size-5"
						>
							<path
								d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
								clip-rule="evenodd"
								fill-rule="evenodd"
							/>
						</svg>
					</a>
				{/if}
				{#if totalPages > 0 && totalPages <= 5}
					{#each { length: totalPages }, index}
						{#if currentPage === index + 1}
							<span class="selected-page">{index + 1}</span>
						{:else}
							<a href={`${url}?page=${index + 1}`} class="unselected-page">{index + 1}</a>
						{/if}
					{/each}
				{/if}
				{#if totalPages > 5}
					<a href={`${url}?page=1`} class="unselected-page">1</a>
					<a href={`${url}?page=2`} class="unselected-page">2</a>
					<span
						class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-600 inset-ring inset-ring-gray-700 focus:outline-offset-0"
						>...</span
					>
					<a href={`${url}?page=${totalPages - 2}`} class="unselected-page"
						>{totalPages - 2}</a
					>
					<a href={`${url}?page=${totalPages - 1}`} class="unselected-page"
						>{totalPages - 1}</a
					>
				{/if}
				<!-- NEXT PAGE -->
				{#if totalPages === currentPage}
					<span class="next-page">
						<span class="sr-only">Next</span>
						<svg
							viewBox="0 0 20 20"
							fill="currentColor"
							data-slot="icon"
							aria-hidden="true"
							class="size-5"
						>
							<path
								d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
								clip-rule="evenodd"
								fill-rule="evenodd"
							/>
						</svg>
					</span>
				{:else}
					<a href={`${url}?page=${currentPage + 1}`} class="next-page">
						<span class="sr-only">Next</span>
						<svg
							viewBox="0 0 20 20"
							fill="currentColor"
							data-slot="icon"
							aria-hidden="true"
							class="size-5"
						>
							<path
								d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
								clip-rule="evenodd"
								fill-rule="evenodd"
							/>
						</svg>
					</a>
				{/if}
			</nav>
		</div>
	</div>
</div>
