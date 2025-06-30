import { Outlet } from 'react-router-dom';
import FloatingScreen from '../components/FloatingScreen.tsx/FloatingScreen';

const Home = () => {
	return (
		<div className="h-full w-full flex flex-col relative">
			{/* Main Display Area */}
			<Outlet />
			<FloatingScreen className="px-3 pt-3" />
		</div>
	);
};

export default Home;
