import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import AppRouter from './router';
import { setGlobalNavigate } from './lib/navigate';

function NavigationSetter() {
	const navigate = useNavigate();

	useEffect(() => {
		setGlobalNavigate(navigate);
	}, [navigate]);

	return null;
}

function App() {
	return (
		<>
			<NavigationSetter />
			<AppRouter />
		</>
	);
}

export default App;
