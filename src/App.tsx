import { ToastContainer } from 'react-toastify';
import './App.css';
import AuthProvider from './context/AuthContext';
import AppRouter from './router';

function App() {
	return (
		<AuthProvider>
			<AppRouter />
			<ToastContainer
				position="top-right"
				draggableDirection="y"
				theme="dark"
				className="toastify-container"
			/>
		</AuthProvider>
	);
}

export default App;
