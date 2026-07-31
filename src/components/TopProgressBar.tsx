import { useNavigation } from 'react-router-dom';

const TopProgressBar = () => {
	const navigation = useNavigation();
	const isNavigating = navigation.state === 'loading';

	return (
		<div className="pointer-events-none fixed inset-x-0 top-0 z-[1000] h-[3px] overflow-hidden">
			<div
				className={`absolute inset-0 bg-accent/20 transition-opacity duration-300 ${
					isNavigating ? 'opacity-100' : 'opacity-0'
				}`}
			>
				<div className="animate-topbar-progress absolute top-0 left-0 h-full w-1/3 rounded-full bg-accent shadow-[0_0_8px_rgba(219,154,64,0.9)]" />
			</div>
		</div>
	);
};

export default TopProgressBar;
