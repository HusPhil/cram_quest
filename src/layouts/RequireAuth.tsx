import { Navigate, Outlet } from 'react-router-dom';
import { useRefreshSessionV2 } from '../features/Auth/hooks/useRefreshSessionV2';

const RequireAuth = () => {
	const { isLoading, isError } = useRefreshSessionV2();

	// Still checking session
	if (isLoading)
		return (
			<div className="flex min-h-screen justify-center items-center ">
				<p className="text-lg font-semibold text-white">
					Checking Authentication..
				</p>
			</div>
		); // Or a <Loading /> spinner

	// If refresh failed → not authenticated → redirect to /auth
	if (isError) return <Navigate to="/auth" replace />;

	// If refresh succeeded → authenticated → render protected routes
	return <Outlet />;
};

export default RequireAuth;
