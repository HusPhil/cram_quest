import { ReactNode } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { FloatingScreenProvider } from "../context/FloatingScreenContext";


interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <FloatingScreenProvider>
      <div className="flex h-[100dvh] bg-background text-text flex-col md:flex-row">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main className="flex flex-col flex-1 w-full items-center transition-all duration-300">
          {children}
        </main>
      </div>
    </FloatingScreenProvider>
  );
};

export default MainLayout;
