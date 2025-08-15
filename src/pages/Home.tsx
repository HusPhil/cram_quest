import { Outlet, useNavigate } from 'react-router-dom';
import FloatingScreen from '../components/FloatingScreen.tsx/FloatingScreen';
import { useEffect } from 'react';

const Home = () => {
	const navigate = useNavigate();
	useEffect(() => {
		const hasVisited = localStorage.getItem('hasVisited');
		if (!hasVisited) {
			localStorage.setItem('hasVisited', 'true');
			navigate('/home/about', { replace: true });
		}
	}, [navigate]);
	return (
		<div className="h-full w-full flex flex-col relative items-center">
			{/* Main Display Area */}
			<Outlet />
			<FloatingScreen className="px-3 pt-3" />
		</div>
	);
};

export default Home;
