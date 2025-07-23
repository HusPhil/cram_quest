/** @type {import('tailwindcss').Config} */
const scrollbarPlugin = require('./tailwind-scrollbar.js');

export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				danger: '#D14444',
				success: '#20cc80',
				secondary: '#323036',
				accent: '#db9a40',
				background: '#22222a',
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
					"'Pixel Square Bold'",
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
	plugins: [scrollbarPlugin],
};
