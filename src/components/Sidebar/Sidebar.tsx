import { useLocation } from "react-router-dom";
import { useState, useEffect} from "react";
import { GiArchiveRegister, GiSpellBook, GiHamburgerMenu, GiCharacter, GiPlayerBase, GiKing, GiKnightBanner, GiBlackKnightHelm, GiCloak, GiClothes } from "react-icons/gi";
import NavItem from "./NavItem";
import NavFooter from "./NavFooter";
import NavHeader from "./NavHeader";



const navItems = [
  { 
    path: '/home',
    label: 'Check In',
    icon: <GiArchiveRegister className="w-6 h-6" />
  },
  { 
    path: '/about',
    label: 'About',
    icon: <GiSpellBook className="w-6 h-6" />
  },
  {
    path: '/home/skins',
    label: 'Skins',
    icon: <GiClothes className="w-6 h-6" />
  }
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Close mobile menu on desktop view
  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Mobile Menu Toggle */}
      <div className="relative">
  <button
    onClick={() => setIsMobileOpen(!isMobileOpen)}
    className="md:hidden absolute top-4 left-4 z-50 p-2.5 rounded-xl
               bg-gray-900/95 backdrop-blur-sm border border-amber-500/20
               active:scale-95 transition-all duration-200"
  >
    <GiHamburgerMenu className="w-5 h-5 text-amber-400" />
  </button>
</div>

      {/* Sidebar */}
      <aside className={`
        fixed md:sticky top-0 h-screen z-50
        bg-gray-900/95 backdrop-blur-md w-64
        transition-all duration-300 ease-out
        ${isMobileOpen ? "left-0" : "-left-64 md:left-0"}
        ${isCollapsed ? "md:w-20" : "md:w-64"}
      `}>
        {/* Header */}
        <NavHeader 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed} 
          setIsMobileOpen={setIsMobileOpen} 
        />

        {isCollapsed && (<hr className="mt-2 mx-2 border-accent/50" />)}

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navItems.map(({ path, label, icon }) => {
            const isActive = path === '/home' 
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
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <NavFooter />
        )}
      </aside>
    </>
  );
}
