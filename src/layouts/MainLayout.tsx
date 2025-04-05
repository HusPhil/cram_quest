import { ReactNode } from "react";
import Sidebar from "../components/Sidebar/Sidebar";


interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex lg:flex-1 h-[100dvh] bg-background text-text flex-col md:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex flex-col flex-1 transition-all duration-300">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
