import { AuthTab } from "../../../pages/Authentication";

interface AuthTabHeaderProps {
  activeTab: string;
  setActiveTab: (tab: AuthTab) => void;
}

export default function ({ activeTab, setActiveTab }: AuthTabHeaderProps) {
  return (
    <>
      <h1 className="text-2xl font-bold text-accent w-full text-center mb-3">
        {`${
          activeTab === "login"
            ? "Embark on your Quest!"
            : "Join the Adventure!"
        }`}
      </h1>
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
    </>
  );
}
