<script lang="ts">
	import { onMount } from "svelte";
	import { page } from '$app/stores';
	import TeamMatchNote from '$lib/components/notes/TeamMatchNote.svelte';
	import { getTeamNotes, type TeamIssue } from "$lib/api-client/fms-client";

	const params = $page.params;
	
	let notes: Awaited<ReturnType<typeof getTeamNotes>> | undefined;
	
	onMount(() => {
		getTeamNotes(parseInt(params.teamNumber ?? "0")).then((res) => (notes = res));
	});
</script>

<div>
	<h1 class="text-2xl font-semibold leading-7">Team {params.teamNumber}</h1>
</div>

<ul role="list" class="divide-y divide-gray-100">
	{#if notes}
		{#if notes.error}
			<p>Error loading team notes</p>
		{:else}
			<pre><code>{JSON.stringify(notes.data, undefined, 2)}</code></pre>
			<!-- {#each notes.data as note}
				<TeamMatchNote {note} />
			{/each} -->
		{/if}
	{/if}
</ul>
