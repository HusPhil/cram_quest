import { ReactNode } from "react";
import Sidebar from "../components/Sidebar/Sidebar";


interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex h-full bg-background text-text">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen relative
                      transition-all duration-300">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
