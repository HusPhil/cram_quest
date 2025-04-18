import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import { FloatingScreenProvider } from '../context/FloatingScreenContext';
import { ToastContainer } from 'react-toastify';

const MainLayout = () => {
	return (
		<FloatingScreenProvider>
			<div className="flex h-[100dvh] bg-background text-text flex-col md:flex-row">
				{/* Sidebar */}
				<Sidebar />

				{/* Main content */}
				<main className="flex flex-col flex-1 w-full items-center transition-all duration-300">
					<Outlet />
				</main>
			</div>
		</FloatingScreenProvider>
	);
};

export default MainLayout;
