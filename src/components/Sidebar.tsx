import { Link, useLocation } from "react-router-dom";
import AppIcon from "./AppIcon";
import { ReactNode, useEffect, useState } from "react";
import { FaHouse, FaCircleInfo, FaBars, FaCircleXmark } from "react-icons/fa6";
import colors from "../assets/colors/colors";

interface SidebarLinkProps {
  to: string;
  icon: ReactNode;
  text: string;
  collapsed: boolean;
  active: boolean;
}

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  function handleMobileOpen() {
    setIsMobileOpen(!isMobileOpen);
    setIsCollapsed(false);
  }

  function handleCollapse() {
    setIsCollapsed(prevIsCollapsed => {
      return !isMobileOpen && !prevIsCollapsed
    })
  }

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      {/* Mobile menu button - fixed position outside sidebar */}
      <button 
        onClick={handleMobileOpen}
        className="md:hidden fixed top-4 left-4 z-30 bg-background/90 p-2 rounded-md 
                 shadow-lg border border-accent/20 hover:scale-110 transition-all
                 active:scale-95"
        aria-label="Toggle menu">
        <FaBars size={20} color={colors.accent}/>
      </button>
      
      <aside
        className={`h-screen bg-background p-4 flex flex-col z-30
                    shadow-[5px_0px_15px_rgba(0,0,0,0.3)] 
                    border-r-2 border-accent/30 bg-gradient-to-b from-background to-background/80
                    transition-all duration-300
                    fixed md:relative
                    ${isMobileOpen ? "left-0" : "-left-64 md:left-0"}
                    ${isCollapsed ? "md:w-16" : "md:w-64"}
                    w-64`}
      >
        <div className="flex justify-between items-center mb-6">
          {/* App Icon (Collapsible Toggle) - only collapsible on desktop */}
          <AppIcon
            onClick={handleCollapse}
            className="cursor-pointer text-accent text-3xl hover:scale-110 transition 
                      hover:text-accent/80 hover:rotate-3 md:block"
          />
          
          {/* Close button - mobile only */}
          <button 
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden text-accent hover:text-accent/80 hover:scale-110 transition-all">
            <FaCircleXmark/>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-4">
          <SidebarLink 
            to="/home" 
            active={location.pathname.includes("/home")} 
            icon={<FaHouse size={isCollapsed ? 22 : 18} color={colors.accent} className="transition-all"/>} 
            text="Home" 
            collapsed={isCollapsed} 
          />
          <SidebarLink 
            to="/about" 
            active={location.pathname.includes("/about")} 
            icon={<FaCircleInfo size={isCollapsed ? 22 : 18} color={colors.accent} />} 
            text="About" 
            collapsed={isCollapsed} 
          />
        </nav>
        
        {/* Optional: footer with game-like elements */}
        <div className={`mt-auto pt-4 border-t border-accent/20 transition-opacity duration-300 
                        ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
          <div className="text-xs text-center text-text/70">
            <div className="flex justify-center items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              Ready for adventure
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

// Sidebar Link Component (Re-usable)
const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, text, collapsed, active }) => {
  return (
    <Link
      to={to}
      className={`flex items-center p-3 rounded-md transition-all duration-300
                  ${active 
                    ? "bg-accent/10 shadow-[0_0_10px_rgba(0,0,0,0.2)] border-l-2 border-accent" 
                    : "hover:bg-accent/5 border-l-2 border-transparent hover:border-accent/30"} 
                  hover:bg-text/20 relative overflow-hidden
                  group
                  ${collapsed ? "justify-center" : ""}`}
    >
      <div className={`z-10 ${active ? "animate-pulse" : "group-hover:scale-110 transition-transform"}`}>
        {icon}
      </div>

      {!collapsed && (
        <span
          className={`font-bold ${active ? "text-accent" : "text-text"} transition-all duration-300 overflow-hidden z-10
                    px-2 max-w-40 opacity-100 ml-2.5`}
        >
          {text}
        </span>
      )}
      
      {active && (
        <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent z-0"></div>
      )}
    </Link>
  );
};
