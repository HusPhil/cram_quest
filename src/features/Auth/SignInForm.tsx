import React from 'react'

export default function SignInForm() {
  return (
    <form className="space-y-4 mt-5">
        <div className="space-y-1">
            <label className="text-sm text-text/70">Username</label>
            <input
            type="email"
            placeholder="CramWarrior"
            className="w-full px-4 py-3 rounded bg-background/50 border border-accent/30 focus:border-accent/60 focus:outline-none transition-colors placeholder:text-text/30 text-sm"
            />
        </div>
        <div className="space-y-1">
            <label className="text-sm text-text/70">Password</label>
            <input
            type="password"
            placeholder="sw0rdP@ssw0rd"
            className="w-full px-4 py-3 rounded bg-background/50 border border-accent/30 focus:border-accent/60 focus:outline-none transition-colors placeholder:text-text/30 text-sm"
            />
        </div>
        <button
            type="submit"
            className="w-full bg-accent/90 hover:bg-accent text-white py-3 rounded-lg font-bold transition-colors relative group overflow-hidden"
        >
            <span className="relative z-10">Begin Quest</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent/80 to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
    </form>
  )
}
