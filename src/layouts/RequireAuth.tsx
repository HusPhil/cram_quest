import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRefreshSession } from '../features/Auth/hooks/useRefreshSession';
import { updateStoresFromRefreshData } from '../lib/axios/token';

const RequireAuth = () => {
	const [authChecked, setAuthChecked] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const requireAuthMutate = useRefreshSession();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				await requireAuthMutate.mutateAsync(undefined, {
					onSuccess: (data) => {
						updateStoresFromRefreshData(data);
					},
				});
				setIsAuthenticated(true);
			} catch (err) {
				setIsAuthenticated(false);
			} finally {
				setAuthChecked(true);
			}
		};

		checkAuth();
	}, []);

	if (!authChecked) return null; // Or a loading spinner

	return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default RequireAuth;
