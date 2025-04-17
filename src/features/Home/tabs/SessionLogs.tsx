import { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function SessionLogs() {
	useEffect(() => {
		console.log('SessionLogs re rendered');
	}, []);

	const { accessToken } = useAuth();

	return (
		<div>
			<h1>{accessToken ? accessToken : 'none'}</h1>
			<p>SessionLogs</p>
		</div>
	);
}
