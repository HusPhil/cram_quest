import { GiArena, GiBookCover, GiCheckMark, GiHamburgerMenu, GiHillConquest, GiScrollUnfurled, GiSpellBook, GiSwordAltar, GiSwordClash } from 'react-icons/gi';
import { NavLink } from 'react-router-dom'

const tabs = [
  { 
    path: '/home/check-in', 
    label: 'Check In',
    icon: <GiCheckMark className="w-6 h-6" /> 
  },
  { 
    path: '/home/quests', 
    label: 'Quests',
    icon: <GiHillConquest className="w-6 h-6" />
  },
  { 
    path: '/home/battle', 
    label: 'Battle',
    icon: <GiSwordClash className="w-6 h-6" />
  },
  { 
    path: '/home/subjects', 
    label: 'Subjects',
    icon: <GiBookCover className="w-6 h-6" /> 
  },
  { 
    path: '/home/logs', 
    label: 'Logs',
    icon: <GiScrollUnfurled className="w-6 h-6" /> 
  },
];

export default function BottomNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-t border-amber-500/20">
      {/* Bottom Navigation Tabs */}
      <div className="max-w-2xl mx-auto px-4 py-2 flex justify-between md:justify-center md:gap-12">
        {tabs.map(({path, label, icon}) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `group flex flex-col items-center px-3 py-2 rounded-lg transition-all duration-200
              ${isActive 
                ? "text-amber-400 bg-amber-400/10" 
                : "text-gray-400 hover:text-amber-400 hover:bg-amber-400/5"}`
            }
          >
            <span className="transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
              {icon}
            </span>
            {isActive && (<span className="mt-1 text-xs font-medium tracking-wide opacity-0 -translate-y-1
                          transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0
                          md:opacity-100 md:translate-y-0">
              {label}
            </span>)}
            {/* Active Indicator */}
            <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-amber-400/0 via-amber-400/50 to-amber-400/0 
                          opacity-0 transition-opacity duration-200
                          group-hover:opacity-50" />
          </NavLink>
        ))}
      </div>
    </div>
  )
}
