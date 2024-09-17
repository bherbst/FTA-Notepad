<script lang="ts">
	import type { components } from '../../../fms/fms-api';

	type MatchNote = components["schemas"]["MatchNoteModel"];

	export let note: MatchNote;

	const updateDate =  new Date(note.timeUpdated ?? "")
	const updateDateString = updateDate.toLocaleDateString()
	const updateTimeString = updateDate.toLocaleTimeString()
</script>

<li class="py-5">
	<div>
		<div class="flex">
			<p class="text-md font-semibold leading-relaxed">Match: {note.tournamentLevel} {note.matchNumber}</p>
			{#if note.playNumber != undefined && note.playNumber > 1}
				<p class="ml-1.5">(play {note.playNumber})</p>
			{/if}
		</div>
		<p class="text-base">{note.note}</p>
		<p class="text-xs italic text-gray-400 justify-self-end">Last updated: {updateDateString} at {updateTimeString}</p>
	</div>
</li>