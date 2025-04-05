import { Outlet } from "react-router-dom";
import BottomNav from "../features/Home/components/BottomNav/BottomNav";

const Home = () => {
  return (
    <div className="flex flex-col flex-1 justify-between">
      {/* Main Display Area */}
      <div className="flex-1 flex items-center justify-center max-h-[85dvh] overflow-hidden my-4">
        <Outlet />
      </div>

      {/* Bottom Navigation Container */}
      <div className="min-h-[10dvh]">
        <BottomNav />
      </div>
      
    </div>
  );
};

export default Home;
