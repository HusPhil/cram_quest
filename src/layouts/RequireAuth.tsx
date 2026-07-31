import { Navigate, Outlet } from 'react-router-dom';
import { useRefreshSession } from '../features/Auth/hooks/useRefreshSession';

const RequireAuth = () => {
	const { data, isLoading } = useRefreshSession();

	// Still checking session
	if (isLoading)
		return (
			<div className="flex min-h-screen justify-center items-center ">
				<p className="text-lg font-semibold text-white">
					Checking Authentication..
				</p>
			</div>
		); // Or a <Loading /> spinner

	// No session data → not authenticated → redirect to /auth
	if (!data) return <Navigate to="/auth" replace />;

	// If refresh succeeded → authenticated → render protected routes
	return <Outlet />;
};

export default RequireAuth;
