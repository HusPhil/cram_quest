import { useState } from "react";

export default function LoginRegister() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-text font-rpg">
      <div className="w-full max-w-md border border-accent bg-secondary rounded-2xl shadow-lg p-6 space-y-6">
        {/* Tab Header */}
        <div className="flex justify-around">
          <button
            className={`w-1/2 py-2 rounded-t-lg font-bold transition-all duration-300 ${
              activeTab === "login"
                ? "bg-accent text-white"
                : "bg-secondary/30 text-text/70"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Sign In
          </button>
          <button
            className={`w-1/2 py-2 rounded-t-lg font-bold transition-all duration-300 ${
              activeTab === "register"
                ? "bg-accent text-white"
                : "bg-secondary/30 text-text/70"
            }`}
            onClick={() => setActiveTab("register")}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        {activeTab === "login" ? (
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded bg-background border border-accent focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded bg-background border border-accent focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-accent text-white py-2 rounded-lg font-bold"
            >
              Log In
            </button>
          </form>
        ) : (
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 rounded bg-background border border-accent focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 rounded bg-background border border-accent focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded bg-background border border-accent focus:outline-none"
            />
            <button
              type="submit"
              className="w-full bg-accent text-white py-2 rounded-lg font-bold"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
