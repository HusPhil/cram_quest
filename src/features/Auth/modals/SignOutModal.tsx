import Modal from '../../../components/Modal';
import { useNavigate } from 'react-router-dom';

export default function SignOutModal({
	handleSignOut,
}: {
	handleSignOut: () => void;
}) {
	const navigate = useNavigate();
	return (
		<Modal
			isOpen={true}
			onClose={() => navigate(-1)}
			lock
			title="Sign Out?"
		>
			<p>Are you sure you want to sign out?</p>
			<small className="text-text/50">
				You will be returned to the login screen.
			</small>
			<div className="flex justify-end w-full pt-4 gap-x-2">
				<button
					type="button"
					onClick={() => navigate(-1)}
					className="px-4 py-2 bg-background/20 hover:bg-background/30  
                                         border border-white/50 rounded-lg text-white text-sm
                                         transition-all duration-200 focus:outline-none
                                         focus:ring-offset-background
                                         active:scale-95 "
				>
					Cancel
				</button>
				<button
					type="button"
					onClick={handleSignOut}
					className="px-4 py-2 bg-danger/20 hover:bg-danger/30 text-danger 
                                         border border-danger rounded-lg font-rpg text-sm
                                         transition-all duration-200 focus:outline-none
                                         focus:ring-offset-background
                                         active:scale-95 "
				>
					Sign out
				</button>
			</div>
		</Modal>
	);
}
