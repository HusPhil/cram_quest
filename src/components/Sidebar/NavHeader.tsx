import { TbChevronsLeft, TbSwords } from 'react-icons/tb';

interface NavHeaderProps {
	isCollapsed: boolean;
	setIsCollapsed: (value: boolean) => void;
	setIsMobileOpen: (value: boolean) => void;
}

export default function NavHeader({
	isCollapsed,
	setIsCollapsed,
	setIsMobileOpen,
}: NavHeaderProps) {
	return (
		<header
			className={`h-16 flex items-center ${
				isCollapsed
					? 'justify-center'
					: 'justify-between px-7 bg-gradient-to-r from-amber-500/10 to-transparent'
			} `}
		>
			{/* Desktop Collapse Toggle */}
			<div className="flex gap-2 items-center justify-center">
				<h1
					className={`
					font-bold text-xl bg-gradient-to-r from-amber-200 to-amber-400 
					text-transparent bg-clip-text transition-all duration-300
					${isCollapsed ? 'lg:hidden lg:translate-x-4' : 'opacity-100'}
				`}
				>
					CramQuest
				</h1>
			</div>

			<button
				onClick={() => setIsCollapsed(!isCollapsed)}
				className="hidden lg:block text-amber-400"
			>
				{isCollapsed ? (
					<TbSwords className="w-7 h-7" />
				) : (
					<TbChevronsLeft className="w-6 h-6	" />
				)}
			</button>

			{/* Mobile Close Button */}
			<button
				onClick={() => setIsMobileOpen(false)}
				className="lg:hidden absolute right-2 p-2 text-amber-400/80 hover:text-amber-400"
			>
				«
			</button>
		</header>
	);
}
