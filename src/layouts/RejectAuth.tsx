import { Navigate, Outlet } from 'react-router-dom';
import { useRefreshSession } from '../features/Auth/hooks/useRefreshSession';

const RejectAuth = () => {
	const { isPending, isError, isLoading, data } = useRefreshSession();

	// While checking → null or loading spinner
	if (isPending || isLoading) return <p>Loading..</p>;

	// If session *is valid* → navigate away
	if (!isError && data) return <Navigate to="/check-in" replace />;

	// If session *is invalid* → allow children to render
	return <Outlet />;
};

export default RejectAuth;
