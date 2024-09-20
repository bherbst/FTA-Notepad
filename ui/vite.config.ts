import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	server: {
		port: parseInt(process.env.PORT),
	},
	ssr: {
		noExternal: ['svelte-hero-icons']
	}
});
