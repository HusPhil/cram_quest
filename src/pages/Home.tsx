import { Outlet } from 'react-router-dom';
import BottomNav from '../features/Home/components/BottomNav/BottomNav';
import FloatingScreen from '../components/FloatingScreen.tsx/FloatingScreen';

const Home = () => {
	return (
		<div className="h-full w-full flex flex-col relative">
			{/* Main Display Area */}
			<Outlet />

			{/* Bottom Navigation Container */}
			<div className="bottom-0 w-full">
				<BottomNav />
			</div>
			<FloatingScreen className="px-3 pt-3" />
		</div>
	);
};

export default Home;
