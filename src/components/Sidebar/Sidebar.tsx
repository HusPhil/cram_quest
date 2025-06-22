import { useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import NavItem from './NavItem';
import NavFooter from './NavFooter';
import NavHeader from './NavHeader';
import { useFloatingScreen } from '../../context/FloatingScreenContext';
import { FaHome, FaQuestion } from 'react-icons/fa';
import { FaRightFromBracket, FaShirt } from 'react-icons/fa6';

const navItems = [
	{
		path: '/home',
		label: 'Home',
		icon: <FaHome className="w-5 h-5" />,
	},
	{
		path: '/about',
		label: 'About',
		icon: <FaQuestion className="w-5 h-5" />,
	},
	{
		path: '/home/skins',
		label: 'Skins',
		icon: <FaShirt className="w-5 h-5" />,
	},
];

const signOutNavItem = {
	path: '/signOut',
	label: 'Sign Out',
	icon: <FaRightFromBracket className="w-5 h-5" />,
};

export default function Sidebar() {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const { closeScreen } = useFloatingScreen();
	const location = useLocation();

	// Close mobile menu on route change
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
			{/* Mobile Overlay */}
			{isMobileOpen && (
				<div
					className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
					onClick={() => setIsMobileOpen(false)}
				/>
			)}

			{/* Mobile Menu Toggle with Current Tab */}
			<div className="relative lg:hidden flex items-center gap-3 p-2 bg-gray-900/95">
				<button
					onClick={() => handleSetIsMobileOpen()}
					className="p-2.5 rounded-xl self-end
                    bg-gray-900/95 backdrop-blur-sm border border-amber-500/20
                    active:scale-95 transition-all duration-200"
				>
					<GiHamburgerMenu className="w-5 h-5 text-amber-400" />
				</button>

				{/* Current Tab Info */}
				<div className="flex items-center gap-2">
					<span className="font-medium text-amber-400">
						{navItems.find(
							(item) => item.path === location.pathname
						)?.label || 'Home'}
					</span>
				</div>
			</div>

			{/* Sidebar */}
			<aside
				className={`
        fixed lg:sticky top-0 h-screen z-[777]
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

				{isCollapsed && <hr className="mt-2 mx-2 border-accent/50" />}

				{/* Navigation */}
				<nav className="p-3 space-y-1">
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

				{/* Footer */}
				{!isCollapsed && <NavFooter />}
			</aside>
		</>
	);
}
