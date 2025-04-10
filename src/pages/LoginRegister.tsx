import { useState } from "react";
import RpgCard from "../components/RpgCard";
import RankTitle from "../components/RankTitle";

export default function LoginRegister() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-text font-rpg relative overflow-hidden px-5">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(255 255 255 / 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(255 255 255 / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Diagonal Stripes */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              rgb(255 255 255 / 0.05) 20px,
              rgb(255 255 255 / 0.05) 40px
            )`
          }}
        />

        {/* Animated Glowing Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/5 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-crystal-light/5 rounded-full filter blur-2xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-crystal-medium/5 rounded-full filter blur-2xl animate-pulse" />
        
        {/* Magical Particles */}
        <div className="absolute inset-0 monarch-particles opacity-30" />
        <div className="absolute inset-0 sage-particles opacity-20" />
      </div>

      {/* Main Card */}
      <RpgCard
        variant="primary"
        className="w-full max-w-md p-6 space-y-6 backdrop-blur-sm"
        glowEffect
        hoverable
      >
        {/* Title */}
        <RankTitle
          text={activeTab === "login" ? "Embark on Your Quest" : "Join the Adventure"}
          color="gold"
          className="mb-8 text-center"
        />

        {/* Tab Header */}
        <div className="flex justify-around">
          <button
            className={`w-1/2 py-2 font-bold transition-all duration-300 border-b-2 ${
              activeTab === "login"
                ? "border-accent text-accent"
                : "border-text/20 text-text/50 hover:text-text/70"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Sign In
          </button>
          <button
            className={`w-1/2 py-2 font-bold transition-all duration-300 border-b-2 ${
              activeTab === "register"
                ? "border-accent text-accent"
                : "border-text/20 text-text/50 hover:text-text/70"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        {activeTab === "login" ? (
          <form className="space-y-4 mt-5">
            <div className="space-y-1">
              <label className="text-sm text-text/70">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded bg-background/50 border border-accent/30 focus:border-accent/60 focus:outline-none transition-colors placeholder:text-text/30 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-text/70">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
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
        ) : (
          <form className="space-y-4 mt-5">
            <div className="space-y-1">
              <label className="text-sm text-text/70">Username</label>
              <input
                type="text"
                placeholder="Choose your username"
                className="w-full px-4 py-3 rounded bg-background/50 border border-accent/30 focus:border-accent/60 focus:outline-none transition-colors placeholder:text-text/30 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-text/70">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded bg-background/50 border border-accent/30 focus:border-accent/60 focus:outline-none transition-colors placeholder:text-text/30 text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-text/70">Password</label>
              <input
                type="password"
                placeholder="Create your password"
                className="w-full px-4 py-3 rounded bg-background/50 border border-accent/30 focus:border-accent/60 focus:outline-none transition-colors placeholder:text-text/30 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-accent/90 hover:bg-accent text-white py-3 rounded-lg font-bold transition-colors relative group overflow-hidden"
            >
              <span className="relative z-10">Create Character</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent/80 to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </form>
        )}
      </RpgCard>
    </div>
  );
}
