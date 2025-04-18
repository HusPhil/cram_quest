import { memo } from 'react';

interface RankTitleProps {
	text: String | undefined;
	color?: 'gold' | 'silver' | 'bronze';
	className?: String;
}

const RankTitle: React.FC<RankTitleProps> = ({
	text,
	color = 'gold',
	className = '',
}) => {
	const colorStyles = {
		gold: 'bg-yellow-500/20 border-yellow-400/40 text-yellow-300 before:border-yellow-500/20 after:border-yellow-500/20',
		silver: 'bg-gray-600/20 border-gray-400/40 text-gray-200 before:border-gray-600/20 after:border-gray-600/20',
		bronze: 'bg-orange-700/20 border-orange-500/40 text-orange-300 before:border-orange-700/20 after:border-orange-700/20',
	};

	return (
		<div className={`relative ${className} group font-medium px-3`}>
			<div
				className={`relative px-6 py-1 ${colorStyles[color]} 
          border-2 backdrop-blur-sm text-center
          before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2
          before:w-4 before:h-8 before:bg-inherit before:border-l-2 before:border-t-2 before:border-b-2
          before:clip-ribbon-tail before:-translate-x-1/2 
          after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2
          after:w-4 after:h-8 after:bg-inherit after:border-r-2 after:border-t-2 after:border-b-2
          after:clip-ribbon-tail after:translate-x-1/2`}
			>
				<span className="relative z-10 tracking-wider text-shadow">
					{text}
				</span>
			</div>
		</div>
	);
};

// Add to your CSS:
`
  @keyframes shine {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
  }
  
  .animate-shine {
    animation: shine 3s ease-in-out infinite;
  }
  
  .clip-ribbon-tail {
    clip-path: polygon(0 20%, 100% 0, 100% 80%, 0 100%);
  }
  
  .text-shadow {
    text-shadow: 0 1px 2px rgba(0,0,0,0.4);
  }
  `;

export default memo(RankTitle);
