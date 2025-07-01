import { AuthTab } from '../types';

interface AuthTabHeaderProps {
	activeTab: AuthTab;
	setActiveTab: (tab: AuthTab) => void;
}

export default function ({ activeTab, setActiveTab }: AuthTabHeaderProps) {
	return (
		<>
			<Header activeTab={activeTab} />
			<TabSelection activeTab={activeTab} setActiveTab={setActiveTab} />
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

const TabSelection = ({
	activeTab,
	setActiveTab,
}: {
	activeTab: AuthTab;
	setActiveTab: (tab: AuthTab) => void;
}) => {
	return (
		<div className="flex justify-around">
			<button
				className={`w-1/2 py-2 font-bold transition-all duration-300 border-b-2 ${
					activeTab === 'signIn'
						? 'border-accent text-accent'
						: 'border-text/20 text-text/50 hover:text-text/70'
				}`}
				onClick={() => setActiveTab('signIn')}
			>
				Sign In
			</button>
			<button
				className={`w-1/2 py-2 font-bold transition-all duration-300 border-b-2 ${
					activeTab === 'signUp'
						? 'border-accent text-accent'
						: 'border-text/20 text-text/50 hover:text-text/70'
				}`}
				onClick={() => setActiveTab('signUp')}
			>
				Sign Up
			</button>
		</div>
	);
};
