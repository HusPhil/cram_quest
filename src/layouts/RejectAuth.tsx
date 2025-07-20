import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useRefreshSession } from '../features/Auth/hooks/useRefreshSession';

const RejectAuth = () => {
	const [checkedAuth, setCheckedAuth] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const requireAuthMutate = useRefreshSession();

	useEffect(() => {
		const check = async () => {
			try {
				await requireAuthMutate.mutateAsync();
				setIsAuthenticated(true);
			} catch {
				setIsAuthenticated(false);
			} finally {
				setCheckedAuth(true);
			}
		};

		check();
	}, []);

	if (!checkedAuth) return null; // Or a <Loading /> spinner
	return isAuthenticated ? <Navigate to="/check-in" replace /> : <Outlet />;
};

export default RejectAuth;
