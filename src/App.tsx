import { ToastContainer } from 'react-toastify';
import './App.css';
import AppRouter from './router';

function App() {
	return (
		<>
			<AppRouter />
			<ToastContainer
				position="top-left"
				draggableDirection="y"
				theme="dark"
				className="toastify-container"
			/>
		</>
	);
}

export default App;
