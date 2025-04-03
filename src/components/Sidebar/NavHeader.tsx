import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoClose } from 'react-icons/io5';

interface NavHeaderProps {
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
    setIsMobileOpen: (value: boolean) => void;
}

export default function NavHeader({ isCollapsed, setIsCollapsed, setIsMobileOpen }: NavHeaderProps) {
  return (
    <header className={`h-16 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between px-7 bg-gradient-to-r from-amber-500/10 to-transparent'} `}>
        {/* Desktop Collapse Toggle */}
        
        
        <h1 className={`
        font-bold text-xl bg-gradient-to-r from-amber-200 to-amber-400 
        text-transparent bg-clip-text transition-all duration-300
        ${isCollapsed ? 'md:hidden md:translate-x-4' : 'opacity-100'}
        `}>
        CramQuest
        </h1>

        <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden md:block text-amber-400"
        >
        {isCollapsed ? <GiHamburgerMenu className="w-5 h-5" /> : "«"}
        </button>

        {/* Mobile Close Button */}
        <button
        onClick={() => setIsMobileOpen(false)}
        className="md:hidden absolute right-2 p-2 text-amber-400/80 hover:text-amber-400"
        >
        «
        </button>
    </header>
  )
}
