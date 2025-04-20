import { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { IconPicker } from '../../../components/IconPicker';
import * as GiIcons from 'react-icons/gi';

export default function SessionLogs() {
	useEffect(() => {
		console.log('SessionLogs re rendered');
	}, []);

	const { accessToken } = useAuth();

	return (
		<div>
			<h1>{accessToken ? accessToken : 'none'}</h1>
			<p>SessionLogs</p>
			<IconPicker
				onSelect={(name) => console.log(name)}
				iconLibraries={{ GiIcons }}
				maxIconsToShow={100}
			/>
		</div>
	);
}
