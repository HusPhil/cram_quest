import RpgCard from '../../components/RpgCard';
import AuthTabHeader from './components/AuthTabHeader';
import SignInForm from './components/SignInForm';
import SignUpForm from './components/SignUpForm';
import { useAuthLayoutStore } from './store/authLayoutStore';

export default function Auth() {
	const activeTab = useAuthLayoutStore((state) => state.activeTab);
	const setActiveTab = useAuthLayoutStore((state) => state.setActiveTab);

	return (
		<div
			className="h-[100dvh] flex items-center justify-center 
                bg-background text-text font-rpg relative overflow-hidden px-5"
		>
			{/* Main Card */}
			<RpgCard
				variant="primary"
				className="w-full max-w-md p-5  backdrop-blur-sm"
			>
				{/* Tab Header */}
				<AuthTabHeader
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>

				{/* Form */}
				{activeTab === 'signIn' ? <SignInForm /> : <SignUpForm />}
			</RpgCard>
		</div>
	);
}
