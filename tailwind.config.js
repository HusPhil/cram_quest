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
			dropShadow: {
				'glow-gray': '0 0 10px rgba(107, 114, 128, 0.7)',
				'glow-green': '0 0 10px rgba(34, 197, 94, 0.7)',
				'glow-blue': '0 0 10px rgba(59, 130, 246, 0.7)',
				'glow-purple': '0 0 10px rgba(168, 85, 247, 0.7)',
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
