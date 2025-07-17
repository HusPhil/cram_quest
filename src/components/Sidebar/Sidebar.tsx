import { useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback, useRef } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import NavItem from './NavItem';
import NavHeader from './NavHeader';
import { useFloatingScreen } from '../../context/FloatingScreenContext';
import {
	TbBrowserCheck,
	TbHelpHexagon,
	TbLogout,
	TbVocabulary,
} from 'react-icons/tb';

const navItems = [
	{
		path: '/home/check-in',
		label: 'Check-in',
		icon: <TbBrowserCheck className="w-[1.55rem] h-[1.55rem]" />,
	},
	{
		path: '/home/subjects',
		label: 'Subjects',
		icon: <TbVocabulary className="w-[1.55rem] h-[1.55rem]" />,
	},
	{
		path: '/about',
		label: 'About',
		icon: <TbHelpHexagon className="w-[1.55rem] h-[1.55rem]" />,
	},
];

const signOutNavItem = {
	path: '/signOut',
	label: 'Sign Out',
	icon: <TbLogout className="w-5 h-5" />,
};

export default function Sidebar() {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const { closeScreen } = useFloatingScreen();
	const location = useLocation();

	useEffect(() => {
		setIsMobileOpen(false);
	}, [location.pathname]);

	const handleSetIsMobileOpen = useCallback(() => {
		setIsMobileOpen(true);
		closeScreen();
	}, []);

	// Close mobile menu on desktop view
	return (
		<>
			<MobileSidebar
				isMobileOpen={isMobileOpen}
				setIsMobileOpen={setIsMobileOpen}
				handleSetIsMobileOpen={handleSetIsMobileOpen}
			/>

			{/* Sidebar */}
			<aside
				className={`
					flex flex-col
					fixed lg:sticky top-0 h-[100dvh] z-[777]
					bg-gray-900/95 backdrop-blur-md w-64
					transition-all duration-300 ease-out
					${isMobileOpen ? 'left-0' : '-left-64 lg:left-0'}
					${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
				`}
			>
				{/* Header */}
				<NavHeader
					isCollapsed={isCollapsed}
					setIsCollapsed={setIsCollapsed}
					setIsMobileOpen={setIsMobileOpen}
				/>

				{isCollapsed && <hr className="mx-2 border-accent/50" />}

				{/* Navigation */}
				<nav className="p-3 flex-1 flex flex-col justify-between">
					<div className="space-y-1">
						{navItems.map(({ path, label, icon }) => {
							const isActive =
								path === '/home'
									? location.pathname.startsWith('/home')
									: location.pathname === path;

							return (
								<NavItem
									key={path}
									path={path}
									label={label}
									icon={icon}
									isActive={isActive}
									isCollapsed={isCollapsed}
									isMobileOpen={isMobileOpen}
								/>
							);
						})}
					</div>
					<NavItem
						key={signOutNavItem.path}
						path={signOutNavItem.path}
						label={signOutNavItem.label}
						icon={signOutNavItem.icon}
						isActive={false}
						isCollapsed={isCollapsed}
						isMobileOpen={isMobileOpen}
					/>
				</nav>
			</aside>
		</>
	);
}

export const MobileSidebar = ({
	isMobileOpen,
	setIsMobileOpen,
	handleSetIsMobileOpen,
}: {
	isMobileOpen: boolean;
	setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleSetIsMobileOpen: () => void;
}) => {
	return (
		<>
			{/* The overlay */}
			{isMobileOpen && (
				<div
					className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
					onClick={() => setIsMobileOpen(false)}
				/>
			)}

			{/* Mobile Menu Toggle with Current Tab */}
			<div className="relative lg:hidden flex items-center gap-3 p-2 bg-gray-900/95">
				<button
					onClick={handleSetIsMobileOpen}
					className="p-2.5 rounded-xl self-end
                    bg-gray-900/95 backdrop-blur-sm border border-amber-500/20
                    active:scale-95 transition-all duration-200"
				>
					<GiHamburgerMenu className="w-5 h-5 text-amber-400" />
				</button>

				{/* Current Tab Info */}
				<div className="flex items-center gap-2">
					<span className="font-medium text-amber-400 text-xl">
						{navItems.find(
							(item) => item.path === location.pathname
						)?.label || 'Home'}
					</span>
				</div>
			</div>
		</>
	);
};
