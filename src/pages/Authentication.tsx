import { useState } from "react";
import RpgCard from "../components/RpgCard";
import SignInForm from "../features/Auth/components/SignInForm";
import SignUpForm from "../features/Auth/components/SignUpForm";
import AuthTabHeader from "../features/Auth/components/AuthTabHeader";
import { useAuth } from "../context/AuthContext";

export type AuthTab = "login" | "register";

export type FormValidationResult = { valid: boolean; message: string };

export default function Authentication() {
  const [activeTab, setActiveTab] = useState<AuthTab>("login");

  const { accessToken } = useAuth()

  return (
    <div
      className="h-[100dvh] flex items-center justify-center 
                bg-background text-text font-rpg relative overflow-hidden px-5"
    >
      {/* Main Card */}
      <RpgCard
        variant="primary"
        className="w-full max-w-md p-6 space-y-6 backdrop-blur-sm"
      >
        {/* Tab Header */}
        <AuthTabHeader activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Form */}
        {activeTab === "login" ? <SignInForm /> : <SignUpForm />}

        <button
        className="w-full py-3 rounded-lg font-bold transition-colors relative group overflow-hidden
        bg-accent/90 text-white hover:bg-accent
        disabled:bg-accent/30 disabled:hover:bg-accent/30 disabled:text-white/70 disabled:cursor-not-allowed"
        onClick={() => alert(accessToken)}
      >
        <span className="relative z-10">TEST</span>
    </button>

      </RpgCard>
    </div>
  );
}
