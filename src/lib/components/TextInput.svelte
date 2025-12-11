<script lang="ts">
	let { name, label, type = 'text', errors = [], value = $bindable(), isReadonly = false } = $props();
</script>

<div>
	<label for={name} class="block mb-1">{label}</label>
	<input
		{type}
		id={name}
		{name}
		class={`w-full p-2 mb-2 border border-gray-300 rounded focus:outline-teal-700 ${isReadonly ? 'bg-gray-200 text-gray-600' : ''}`}
		bind:value
		readonly={isReadonly}
	/>
	{#if errors}
		{#each errors as errorMessage}
			<div class="error-message">* {errorMessage}</div>
		{/each}
	{/if}
</div>
