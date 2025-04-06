import { Outlet } from "react-router-dom";
import BottomNav from "../features/Home/components/BottomNav/BottomNav";

const Home = () => {
  return (
    <>
      {/* Main Display Area */}
      <div className="flex-1 flex justify-center items-center">
        <Outlet />
      </div>

      {/* Bottom Navigation Container */}
      <BottomNav />
      
    </>
  );
};

export default Home;
