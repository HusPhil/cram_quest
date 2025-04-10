import { useState, useEffect, useCallback, use } from "react";
import { FormValidationResult } from "../../../pages/Authentication";
import useSignIn from "../hooks/useSignIn";
import useSignUp from "../hooks/useSignUp";
import { useAuth } from "../../../context/AuthContext";

export default function SignInForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validation, setValidation] = useState<FormValidationResult>({
    valid: false,
    message: "",
  });

  const signInMutate = useSignIn();

  useEffect(() => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (trimmedUsername.length === 0) {
      setValidation({ valid: false, message: "Please provide your username" });
    } else if (trimmedPassword.length === 0) {
      setValidation({ valid: false, message: "Please provide your password" });
    } else {
      setValidation({ valid: true, message: "Successfully signed in" });
    }
  }, [username, password]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      signInMutate.mutate({ username, password});
      e.preventDefault();
      // alert(`Signed in as ${username} with password ${password}`);
    },
    [username, password]
  );


  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-5">
      <div className="space-y-1">
        <label className="text-sm text-text/70">Username</label>
        <input
          type="text"
          placeholder="CramWarrior"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-3 rounded bg-background/50 border border-accent/30 focus:border-accent/60 focus:outline-none transition-colors placeholder:text-text/30 text-sm"
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm text-text/70">Password</label>
        <input
          type="password"
          placeholder="sw0rdP@ssw0rd"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded bg-background/50 border border-accent/30 focus:border-accent/60 focus:outline-none transition-colors placeholder:text-text/30 text-sm"
        />
      </div>
      <button
        type="submit"
        disabled={!validation.valid}
        className="w-full py-3 rounded-lg font-bold transition-colors relative group overflow-hidden
        bg-accent/90 text-white hover:bg-accent
        disabled:bg-accent/30 disabled:hover:bg-accent/30 disabled:text-white/70 disabled:cursor-not-allowed"
      >
        <span className="relative z-10">Begin Quest</span>
        <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent/80 to-accent opacity-0 group-hover:opacity-100 transition-opacity group-disabled:opacity-0" />
      </button>
    </form>
  );
}
