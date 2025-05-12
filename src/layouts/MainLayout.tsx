import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import {
	FloatingScreenProvider,
	useFloatingScreen,
} from '../context/FloatingScreenContext';
import { ToastContainer } from 'react-toastify';
import FloatingScreen from '../components/FloatingScreen.tsx/FloatingScreen';

const MainLayout = () => {
	const { isScreenOpen } = useFloatingScreen();
	return (
		<div className="flex h-[100dvh] bg-background text-text flex-col md:flex-row">
			{/* Sidebar */}
			<div
				className={`transition-[max-height] duration-500 overflow-hidden ${
					isScreenOpen ? 'max-h-0 md:max-h-[100vh]' : 'max-h-[100vh]'
				}`}
			>
				<Sidebar />
			</div>
			{/* Main content */}
			<main className="flex flex-col flex-1 w-full items-center transition-all duration-300">
				<Outlet />
			</main>
		</div>
	);
};

export default MainLayout;
