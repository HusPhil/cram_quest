import { GiArena, GiBookCover, GiCheckMark, GiHamburgerMenu, GiHillConquest, GiScrollUnfurled, GiSpellBook, GiSwordAltar, GiSwordClash } from 'react-icons/gi';
import { NavLink } from 'react-router-dom'
import useScreenResize from '../../../../hooks/useScreenResize';
import { SCREEN_SIZES } from '../../../../data/screen';
import { useEffect } from 'react';

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
  const currentScreenSize = useScreenResize();

  useEffect(() => {
    (currentScreenSize)
  }, [currentScreenSize])

  return (
    <div className="bg-secondary/95 backdrop-blur-md border-t border-amber-500/20 
                      md:bg-transparent md:border-none md:mb-5 md:mx-2">
      {/* Bottom Navigation Tabs */}
      <div className="max-w-2xl mx-auto p-4 flex justify-between 
                      md:justify-around md:gap-8 md:bg-secondary md:rounded-xl">
        {tabs.map(({path, label, icon}) => (
          <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `group flex flex-col items-center px-3 py-2 justify-center rounded-lg transition-all duration-200
            ${isActive 
              ? "text-amber-400 bg-amber-400/10" 
              : "hover:text-amber-400 hover:bg-amber-400/5"}`
          }
        >
          {({ isActive }) => (
            <>
              <span className="transition-transform duration-200 group-hover:scale-110 group-active:scale-95">
                {icon}
              </span>
        
              {currentScreenSize != "SMALL" ? (
                <span className="line-clamp-1 mt-1 text-xs font-medium tracking-wide">
                  {label}
                </span>
              ) : (isActive && (
                <span className=" mt-1 text-xs font-medium tracking-wide">
                  {label}
                </span>
              ))}
      
            </>
          )}
        </NavLink>
        
        ))}
      </div>
    </div>
  )
}
