import React, { memo, ReactNode } from 'react';

interface RpgCardProps {
	children: ReactNode;
	variant?: 'primary' | 'secondary' | 'success' | 'danger';
	className?: string;
	hoverable?: boolean;
	glowEffect?: boolean;
	bordered?: boolean;
}

const RpgCard: React.FC<RpgCardProps> = ({
	children,
	variant = 'primary',
	className = '',
	hoverable = false,
	glowEffect = false,
	bordered = true,
}) => {
	const getVariantStyles = () => {
		switch (variant) {
			case 'secondary':
				return 'bg-gray-800/50 border-gray-500/20';
			case 'success':
				return 'bg-green-900/50 border-green-500/20';
			case 'danger':
				return 'bg-red-900/50 border-red-500/20';
			case 'primary':
			default:
				return 'bg-gray-800/50 border-amber-500/20';
		}
	};

	return (
		<div
			className={`
        relative rounded-lg backdrop-blur-sm shadow-lg
        ${getVariantStyles()}
        ${bordered ? 'border' : ''}
        ${
			hoverable
				? 'transition-transform duration-200 hover:scale-[1.02]'
				: ''
		}
        ${className}
      `}
		>
			{/* Background Gradient */}
			<div
				className={`
        absolute inset-0 bg-gradient-to-b 
        ${
			variant === 'secondary'
				? 'from-gray-500/5'
				: variant === 'success'
				? 'from-green-500/5'
				: variant === 'danger'
				? 'from-red-500/5'
				: 'from-amber-500/5'
		} 
        to-transparent rounded-lg
      `}
			></div>

			{/* Glow Effect */}
			{glowEffect && (
				<div
					className={`
          absolute -inset-0.5 bg-gradient-to-r
          ${
				variant === 'secondary'
					? 'from-gray-500/0 via-gray-500/10'
					: variant === 'success'
					? 'from-green-500/0 via-green-500/10'
					: variant === 'danger'
					? 'from-red-500/0 via-red-500/10'
					: 'from-amber-500/0 via-amber-500/10'
			} 
          to-transparent opacity-0 group-hover:opacity-100
          blur-sm transition-opacity rounded-lg
        `}
				></div>
			)}

			{/* Content */}
			<div className="relative">{children}</div>
		</div>
	);
};

export default memo(RpgCard);
