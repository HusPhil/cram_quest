import { Outlet } from "react-router-dom";
import BottomNav from "../features/Home/components/BottomNav/BottomNav";

const Home = () => {
  return (
    <div className="flex flex-col h-full">
      {/* Main Display Area */}
      <div className="flex-1 flex items-center justify-center">
        <Outlet />
      </div>

      {/* Bottom Navigation Container */}
      <BottomNav />
    </div>
  );
};

export default Home;
