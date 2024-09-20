<script lang="ts">
	import { get } from 'svelte/store';
	import Spinner from '../Spinner.svelte';
	import Modal from '../Modal.svelte';
	import Button from '../Button.svelte';
	import Toggle from '../Toggle.svelte';
	import { settingsStore } from '../../settings-store';
	import TextInput from '../TextInput.svelte';
	import { fmsClient } from '$lib/api-client/fms-client';
	import { onMount } from 'svelte';
	import { Icon } from '@steeze-ui/svelte-icon';
	import { CheckCircle, ExclamationTriangle, SignalSlash } from '@steeze-ui/heroicons';

	export let settingsOpen = false;

	let settings = get(settingsStore);
	export let installPrompt: Event | null;

	let loading = false;

	enum CredentialsState { Loading, Valid, Invalid, Unknown };
	let credentialsState: CredentialsState = CredentialsState.Loading;

	function updateSettings() {
		console.log(settings);
		settingsStore.set(settings);
		checkCredentials();
	}

	function checkCredentials() {
		credentialsState = CredentialsState.Loading;
		fmsClient.GET(
			"/api/v{version}/FTA",
			{
				params: { path: { version: 1.0 } }
			}
		).then( ({error}) => {
			console.log("result" +error)
			if (error) {
				credentialsState = CredentialsState.Invalid;
			} else {
				credentialsState = CredentialsState.Valid;
			}
		}).catch((error) => {
			credentialsState = CredentialsState.Unknown;
			console.log(error);
			console.log(error.message);
			console.log(error.stack);
		});
	}

	function clearStorage() {
		localStorage.clear();
		window.location.reload();
	}

	onMount(checkCredentials);
</script>

<Spinner show={loading} />

<Modal bind:open={settingsOpen} size="lg" dismissable outsideclose title="Settings">
	<form class="justify-start text-left">
		<div class="grid grid-cols-1 md:grid-cols-2 gap-2">
			<Toggle bind:checked={settings.darkMode} onchange={updateSettings}>
				Dark Mode
			</Toggle>
			<Toggle bind:checked={settings.developerMode} onchange={updateSettings}>
				Developer Mode
			</Toggle>
			
			<div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
				<h3 class="text-base font-semibold leading-6">Credentials</h3>
				{#if credentialsState === CredentialsState.Valid}
				Valid
					<Icon src="{CheckCircle}" theme="solid" class="color-green-900" size="24"/>
				{:else if credentialsState === CredentialsState.Invalid}
				Invalid
				<Icon src="{ExclamationTriangle}" theme="solid" class="color-red-900" size="24"/>
				{:else if credentialsState === CredentialsState.Unknown}
				Unknown
					<Icon src="{SignalSlash}" theme="solid" class="color-red-900" size="24"/>
				{:else}
				Loading
					<Spinner/>
				{/if}
			</div>
			
			<TextInput bind:text={settings.username} placeholder="JSmith"
			onblur={updateSettings}>
				Username
			</TextInput>
			
			<TextInput bind:text={settings.key} placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
			onblur={updateSettings}>
				API Key
			</TextInput>
			
			<div class="grid gap-2 md:col-span-2 mt-2">
				{#if installPrompt}
					<Button
						color="primary"
						on:click={() => {
							// @ts-ignore
							if (installPrompt) installPrompt.prompt();
						}}>Install</Button
					>
				{/if}
				<Button on:click={clearStorage} color="red">Clear All Data</Button>
			</div>
		</div>
	</form>
	<div
		class="border-t border-neutral-500 pt-2 mt-4 flex flex-col text-center text-black dark:text-white"
	>
		<h1 class="text-lg">About</h1>
		<p>Version: {settings.version}</p>
		<a
			href="https://github.com/FIRST-Robotics-Competition/FTA-Notepad/"
			class="underline text-blue-400">GitHub</a
		>
	</div>
</Modal>
