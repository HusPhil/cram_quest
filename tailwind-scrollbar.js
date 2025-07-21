const plugin = require('tailwindcss/plugin');

module.exports = plugin(function ({ addUtilities, theme }) {
	const newUtilities = {
		'.scrollbar-thin::-webkit-scrollbar': {
			width: '6px',
			height: '6px',
		},
		'.scrollbar-thin::-webkit-scrollbar-track': {
			background: 'transparent',
			scrollbarGutter: 'stable',
		},
		'.scrollbar-thin::-webkit-scrollbar-thumb': {
			backgroundColor: theme('colors.secondary'),
			borderRadius: '4px',
		},
		'.scrollbar-thin::-webkit-scrollbar-thumb:hover': {
			backgroundColor: theme('colors.text'),
		},
		'.scrollbar-thin': {
			scrollbarWidth: 'thin',
			scrollbarColor: `rgba(255, 255, 255, 0.25) transparent`,
		},

		'.scrollbar-thin-accent': {
			scrollbarWidth: 'thin',
			scrollbarColor: `${theme('colors.accent')} transparent`,
		},

		'.scrollbar-dark::-webkit-scrollbar-track': {
			background: theme('colors.background'),
		},
		'.scrollbar-dark::-webkit-scrollbar-thumb': {
			backgroundColor: theme('colors.danger'),
		},
		'.scrollbar-dark': {
			scrollbarColor: `${theme('colors.danger')} ${theme(
				'colors.background'
			)}`,
		},
		'.scrollbar-stable': {
			scrollbarGutter: 'stable both-edges',
		},
	};

	addUtilities(newUtilities, ['responsive']);
});
