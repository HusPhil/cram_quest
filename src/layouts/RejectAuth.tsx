import { Navigate, Outlet } from 'react-router-dom';
import { useRefreshSession } from '../features/Auth/hooks/useRefreshSession';

const RejectAuth = () => {
	const { data } = useRefreshSession();

	// If session *is valid* → navigate away
	if (data) return <Navigate to="/home/check-in" replace />;

	// Otherwise render the auth page immediately (no loading flash on refetch)
	return <Outlet />;
};

export default RejectAuth;
