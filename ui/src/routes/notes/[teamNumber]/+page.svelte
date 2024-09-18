<script lang="ts">
	import { page } from '$app/stores';
	import TeamMatchNote from '$lib/components/notes/TeamMatchNote.svelte';
	import type { components } from '../../../fms/fms-api';

	type MatchNoteModel = components['schemas']['MatchNoteModel'];

	const params = $page.params;

	const notes: MatchNoteModel[] = [
		{
			note: 'Hungry for carpet',
			noteId: '1',
			tournamentLevel: 'Practice',
			matchNumber: 1,
			playNumber: 1,
			teamNumber: parseInt(params.teamNumber!),
			timeAdded: 'Wed Aug 7 2024 00:00:00 GMT+0000 (Coordinated Universal Time)',
			timeUpdated: 'Wed Aug 7 2024 00:00:00 GMT+0000 (Coordinated Universal Time)',
			isDeleted: false,
			whoAdded: '', // TODO will this be a usable format?
			whoUpdated: '', // TODO will this be a usable format?
			recordVersion: 1
		},
		{
			note: 'Fire! 🔥',
			noteId: '1',
			tournamentLevel: 'Qualification',
			matchNumber: 23,
			playNumber: 8,
			teamNumber: parseInt(params.teamNumber!),
			timeAdded: 'Wed Aug 7 2024 00:00:00 GMT+0000 (Coordinated Universal Time)',
			timeUpdated: 'Wed Aug 7 2024 00:00:00 GMT+0000 (Coordinated Universal Time)',
			isDeleted: false,
			whoAdded: '', // TODO will this be a usable format?
			whoUpdated: '', // TODO will this be a usable format?
			recordVersion: 1
		}
	];
</script>

<div>
	<h1 class="text-2xl font-semibold leading-7">Team {params.teamNumber}</h1>
</div>

<ul role="list" class="divide-y divide-gray-100">
	{#each notes as note}
		<TeamMatchNote {note} />
	{/each}
</ul>
