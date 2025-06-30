import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

// NavItem Component
interface NavItemProps {
	path: string;
	label: string;
	icon: ReactNode;
	isActive: boolean;
	isCollapsed: boolean;
	isMobileOpen: boolean;
	otherClassname?: string;
}

const NavItem = ({
	path,
	label,
	icon,
	isActive,
	isCollapsed,
	isMobileOpen,
	otherClassname,
}: NavItemProps) => {
	return (
		<Link
			to={path}
			className={`
            group flex items-center rounded-lg
            transition-all duration-200 relative
            ${isCollapsed ? 'lg:justify-center px-2' : 'px-3'} py-2.5
            ${isActive ? 'bg-amber-400/10' : 'hover:bg-amber-400/5'}
			${otherClassname}
        `}
		>
			<div
				className={`
            transition-transform duration-200
            group-hover:scale-110 group-active:scale-95
            ${
				isActive
					? 'text-amber-400'
					: 'text-gray-400 group-hover:text-amber-400'
			}
        `}
			>
				{icon}
			</div>

			<span
				className={`
            font-medium tracking-wide whitespace-nowrap
            transition-all duration-300
            ${isCollapsed ? 'lg:hidden' : 'opacity-100 ml-3'}
            ${isMobileOpen && 'ml-3'}
            ${
				isActive
					? 'text-amber-400'
					: 'text-gray-400 group-hover:text-amber-400'
			}
        `}
			>
				{label}
			</span>

			{isActive && (
				<div
					className="absolute inset-0 rounded-lg
                        bg-gradient-to-r from-amber-400/10 via-amber-400/5 to-transparent"
				/>
			)}
		</Link>
	);
};

export default NavItem;
