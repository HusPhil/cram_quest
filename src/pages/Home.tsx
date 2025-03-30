import { NavLink, Outlet } from "react-router-dom";

const Home = () => {
    return (
      <div className="flex flex-col h-full bg-background text-text">
        {/* Main Display Area */}
        <div className="flex-1 flex items-center justify-center text-2xl font-bold">
          <Outlet /> {/* This will render the current tab's content */}
        </div>
  
        {/* Bottom Navigation Tabs */}
        <div className="border-t border-gray-700 p-4 flex justify-center gap-6">
          {["check-in", "quests", "battle", "subjects", "logs"].map((tab) => (
            <NavLink
              key={tab}
              to={`/home/${tab}`}
              className={({ isActive }) =>
                `p-2 ${isActive ? "text-primary border-b-2 border-primary" : "text-gray-400"}`
              }
            >
              {tab.replace("-", " ")}
            </NavLink>
          ))}
        </div>
      </div>
    );
  };

export default Home;
