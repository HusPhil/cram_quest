import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FloatingScreenProvider } from './context/FloatingScreenContext.tsx';
import { ToastContainer } from 'react-toastify';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<FloatingScreenProvider>
				<App />
				<ReactQueryDevtools />
				<ToastContainer
					position="bottom-left"
					closeOnClick
					theme="dark"
					className="toastify-container"
				/>
			</FloatingScreenProvider>
		</QueryClientProvider>
	</StrictMode>
);
