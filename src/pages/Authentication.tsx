import { useState } from "react";
import RpgCard from "../components/RpgCard";
import RankTitle from "../components/RankTitle";
import SignInForm from "../features/Auth/SignInForm";
import SignUpForm from "../features/Auth/SignUpForm";

export default function Authentication() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className="h-[100dvh] flex items-center justify-center bg-background text-text font-rpg relative overflow-hidden px-5">
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
      >
        {/* Title */}
        <h1 className="text-2xl font-bold text-accent w-full text-center mb-3">{`${activeTab === "login" ? "Embark on your Quest!" : "Join the Adventure!"}`}</h1>
        

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
          <SignInForm />
        ) : (
          <SignUpForm />
        )}
      </RpgCard>
    </div>
  );
}
