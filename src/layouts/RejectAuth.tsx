import { Navigate, Outlet } from 'react-router-dom';
import { useRefreshSessionV2 } from '../features/Auth/hooks/useRefreshSessionV2';

const RejectAuth = () => {
	const { isPending, isError } = useRefreshSessionV2();

	// While checking → null or loading spinner
	if (isPending) return null;

	// If session *is valid* → navigate away
	if (!isError) return <Navigate to="/check-in" replace />;

	// If session *is invalid* → allow children to render
	return <Outlet />;
};

export default RejectAuth;
