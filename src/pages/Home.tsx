import { Outlet } from "react-router-dom";
import BottomNav from "../features/Home/components/BottomNav/BottomNav";

const Home = () => {
  return (
    <div className="flex flex-col flex-1">
      {/* Main Display Area */}
      <div className="flex-1 flex items-start justify-center h-[100dvh] mx-4 mt-4 md:items-center">
        <Outlet />
      </div>

      {/* Bottom Navigation Container */}
      <BottomNav />
      
    </div>
  );
};

export default Home;
