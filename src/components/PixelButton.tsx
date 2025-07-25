import React, { ReactNode, ButtonHTMLAttributes } from 'react';

interface PixelatedButtonColors {
	face?: string;
	shadow?: string;
	border?: string;
	text?: string;
}

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	variant?: 'default' | 'github';
	icon?: ReactNode;
	colors?: PixelatedButtonColors;
}

const PixelButton: React.FC<PixelButtonProps> = ({
	children,
	variant = 'default',
	icon,
	colors,
	disabled,
	className = '',
	style,
	...props
}) => {
	const defaultColors = {
		face: '#ffffff',
		shadow: '#e2e8f0',
		border: '#64748b',
		text: '#374151',
	};

	const buttonColors = { ...defaultColors, ...colors };
	const createBorderImage = (color: string) =>
		`data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_183_5329)'%3E%3Cpath d='M2 0H3V1H2V0ZM3 0H4V1H3V0ZM1 1H2V2H1V1ZM4 1H5V2H4V1ZM0 2H1V3H0V2ZM5 2H6V3H5V2ZM0 3H1V4H0V3ZM5 3H6V4H5V3ZM1 4H2V5H1V4ZM4 4H5V5H4V4ZM2 5H3V6H2V5ZM3 5H4V6H3V5Z' fill='${encodeURIComponent(
			color
		)}'/%3E%3C/g%3E%3Cdefs%3E%3CclipPath id='clip0_183_5329'%3E%3Crect width='6' height='6' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A`;

	const borderImages = {
		default: createBorderImage('#94A3B8'),
		github: createBorderImage('#333333'),
	};

	const clipPath =
		'polygon(4px 0px, 4px 2px, 2px 2px, 2px 4px, 0px 4px, 0px calc(100% - 4px), 2px calc(100% - 4px), 2px calc(100% - 2px), 4px calc(100% - 2px), 4px 100%, calc(100% - 4px) 100%, calc(100% - 4px) calc(100% - 2px), calc(100% - 2px) calc(100% - 2px), calc(100% - 2px) calc(100% - 4px), 100% calc(100% - 4px), 100% calc(100% - 4px), 100% 4px, calc(100% - 2px) 4px, calc(100% - 2px) 2px, calc(100% - 4px) 2px, calc(100% - 4px) 0px)';

	// Combined function to handle press start (mouse down or touch start)
	const handlePressStart = (
		e:
			| React.MouseEvent<HTMLButtonElement>
			| React.TouchEvent<HTMLButtonElement>
	) => {
		if (disabled) return;
		const target = e.currentTarget;
		const before = target.querySelector('.before') as HTMLElement;
		const content = target.querySelector('.content') as HTMLElement;
		if (before) before.style.transform = 'translateY(4px)';
		if (content) content.style.transform = 'translateY(4px)';
	};

	// Combined function to handle press end (mouse up, mouse leave, or touch end)
	const handlePressEnd = (
		e:
			| React.MouseEvent<HTMLButtonElement>
			| React.TouchEvent<HTMLButtonElement>
	) => {
		const target = e.currentTarget;
		const before = target.querySelector('.before') as HTMLElement;
		const content = target.querySelector('.content') as HTMLElement;
		if (before) before.style.transform = '';
		if (content) content.style.transform = '';
	};

	return (
		<button
			className={`relative bg-transparent border-none text-base font-medium transition-all duration-100 outline-none ${
				disabled ? 'opacity-60 cursor-not-allowed ' : 'cursor-pointer'
			} `}
			style={{ color: buttonColors.text, ...style }}
			disabled={disabled}
			// Mouse events (for desktop/laptop)
			onMouseDown={handlePressStart}
			onMouseUp={handlePressEnd}
			onMouseLeave={handlePressEnd}
			// Touch events (for mobile)
			onTouchStart={handlePressStart}
			onTouchEnd={handlePressEnd}
			onTouchCancel={handlePressEnd}
			{...props}
		>
			{/* Button Face */}
			{/* Button Content */}
			<span
				className={`content relative z-20 flex items-center gap-2 pointer-events-none transition-transform duration-100  ${className} ${
					disabled ? 'translate-y-[4px]' : ''
				}`}
				style={{
					height: 'calc(100% - 3px)',
					backgroundColor: buttonColors.face,
					borderImage: colors?.border
						? `url("${createBorderImage(
								colors.border
						  )}") 2 / 4px / 0px stretch`
						: `url("${borderImages[variant]}") 2 / 4px / 0px stretch`,
					borderStyle: 'solid',
					borderWidth: '0px',
					clipPath,
				}}
			>
				{icon}
				{children}
			</span>

			{/* Shadow */}
			<span
				className="absolute inset-0"
				style={{
					height: 'calc(100%)',
					top: '4px',
					backgroundColor: buttonColors.shadow,
					borderImage: colors?.border
						? `url("${createBorderImage(
								colors.border
						  )}") 2 / 4px / 0px stretch`
						: `url("${borderImages[variant]}") 2 / 4px / 0px stretch`,
					borderStyle: 'solid',
					borderWidth: '0px',
					clipPath,
				}}
			/>
		</button>
	);
};

export default PixelButton;
