import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import { useFloatingScreen } from '../context/FloatingScreenContext';
import { useBattleSetupStore } from '../features/Subjects/stores/battleSetupStore';

const MainLayout = () => {
	const { isScreenOpen } = useFloatingScreen();
	const isBattleActive = useBattleSetupStore((state) => state.isBattleActive);

	return (
		<div className="flex h-[100dvh] bg-background text-text flex-col lg:flex-row">
			{/* Sidebar */}
			{!isBattleActive && (
				<div
					className={`transition-[max-height] duration-500 overflow-hidden ${
						isScreenOpen
							? 'max-h-0 lg:max-h-[100vh]'
							: 'max-h-[100vh]'
					}`}
				>
					<Sidebar />
				</div>
			)}
			{/* Main content */}
			<main className="flex flex-col flex-1 w-full items-center transition-all duration-300">
				<Outlet />
			</main>
		</div>
	);
};

export default MainLayout;
