/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#D14444',
				secondary: '#111827',
				accent: '#E6B800',
				background: '#1E1E2E',
				text: '#D0D0D0',
				crystal: {
					light: '#5BE7FF', // Bright Cyan Crystal
					medium: '#B388EB', // Amethyst Purple
					glow: '#A2F3C6', // Emerald Glow
					border: '#87CEEB', // Sky Blue
				},
			},
			fontFamily: {
				rpg: [
					"'Press Start 2P'",
					"'Pixelify Sans'",
					"'MedievalSharp'",
					'sans-serif',
				],
			},
		},
		screens: {
			xs: '320px',
			sm: '590px',
			md: '600px',
			lg: '1024px',
			xl: '1280px',
		},
	},
	plugins: [],
};
