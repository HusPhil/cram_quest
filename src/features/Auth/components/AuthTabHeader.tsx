import Tabs from '../../../components/Tabs';
import { AuthTab } from '../types';

interface AuthTabHeaderProps {
	activeTab: AuthTab;
	setActiveTab: (tab: AuthTab) => void;
}

export default function ({ activeTab, setActiveTab }: AuthTabHeaderProps) {
	return (
		<>
			<Header activeTab={activeTab} />
			<Tabs
				tabs={[
					{ label: 'Sign In', value: 'signIn' },
					{ label: 'Sign Up', value: 'signUp' },
				]}
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				activeClassName="font-bold border-accent text-accent"
			/>
		</>
	);
}

const Header = ({ activeTab }: { activeTab: AuthTab }) => (
	<h1 className="text-2xl font-bold text-accent w-full text-center mb-3">
		{`${
			activeTab === 'signIn'
				? 'Embark on your Quest!'
				: 'Join the Adventure!'
		}`}
	</h1>
);
