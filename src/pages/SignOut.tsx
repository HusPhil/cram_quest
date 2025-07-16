import { useEffect } from 'react';
import useSignOut from '../features/Auth/hooks/useSignOut';

export default function SignOut() {
	const signOutMutate = useSignOut();

	useEffect(() => {
		signOutMutate.mutate();
	}, []);

	return (
		<div className="h-dvh flex justify-center items-center">SignOut..</div>
	);
}
