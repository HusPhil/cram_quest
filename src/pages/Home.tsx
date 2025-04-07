import { Outlet } from "react-router-dom";
import BottomNav from "../features/Home/components/BottomNav/BottomNav";
import FloatingScreen from "../components/FloatingScreen.tsx/FloatingScreen";

const Home = () => {
  return (
      <div className="h-full w-full flex flex-col relative">
        {/* Main Display Area */}
        <div className="flex-1 w-full flex justify-center items-center">
          <Outlet />
        </div>
        
        {/* Bottom Navigation Container */}
        <BottomNav />
        <FloatingScreen/>
      </div>
  );
};

export default Home;
