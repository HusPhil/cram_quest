import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <form className="space-y-4 mt-5">
      <div className="space-y-1">
        <label className="text-sm text-text/70">Email</label>
        <input
          type="email"
          placeholder="cramwarrior@example.com"
          className="w-full px-4 py-3 rounded bg-background/50 border border-accent/30 focus:border-accent/60 focus:outline-none transition-colors placeholder:text-text/30 text-sm"
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm text-text/70">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="sw0rdP@ssw0rd"
            className="w-full px-4 py-3 rounded bg-background/50 border border-accent/30 focus:border-accent/60 focus:outline-none transition-colors placeholder:text-text/30 text-sm pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-text/50 hover:text-accent transition-colors"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm text-text/70">Confirm password</label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="sw0rdP@ssw0rd"
            className="w-full px-4 py-3 rounded bg-background/50 border border-accent/30 focus:border-accent/60 focus:outline-none transition-colors placeholder:text-text/30 text-sm pr-10"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-text/50 hover:text-accent transition-colors"
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-accent/90 hover:bg-accent text-white py-3 rounded-lg font-bold transition-colors relative group overflow-hidden"
      >
        <span className="relative z-10">Create Character</span>
        <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent/80 to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </form>
  );
}
