interface Tab<T extends string> {
	label: string;
	value: T;
}

interface TabsProps<T extends string> {
	tabs: Tab<T>[];
	activeTab: T;
	setActiveTab: (tab: T) => void;
	className?: string;
	activeClassName?: string;
	inactiveClassName?: string;
}

export default function Tabs<T extends string>({
	tabs,
	activeTab,
	setActiveTab,
	className = 'flex justify-around',
	activeClassName = 'border-accent text-accent',
	inactiveClassName = 'border-text/20 text-text/50 hover:text-text/70',
}: TabsProps<T>) {
	return (
		<div className={className}>
			{tabs.map((tab) => (
				<button
					key={tab.value}
					className={`w-1/2 py-2 transition-all duration-300 border-b-2 ${
						activeTab === tab.value
							? activeClassName
							: inactiveClassName
					}`}
					onClick={() => setActiveTab(tab.value)}
				>
					{tab.label}
				</button>
			))}
		</div>
	);
}
