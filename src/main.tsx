import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient.ts';
import { FloatingScreenProvider } from './context/FloatingScreenContext.tsx';
import { ToastContainer } from 'react-toastify';

import 'react-loading-skeleton/dist/skeleton.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<FloatingScreenProvider>
				<App />
				<ToastContainer
					position="bottom-left"
					closeOnClick
					theme="dark"
					className="toastify-container lett"
				/>
			</FloatingScreenProvider>
		</QueryClientProvider>
	</StrictMode>
);
