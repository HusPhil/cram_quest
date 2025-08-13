import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: '/',
	server: {
		allowedHosts: ['REDACTED_HOST'],
		host: true, // or 'REDACTED_IP'
		port: 5173,
	},
});
