interface TabIconProps {
	tabName: string;
	tabIcon: string;
	isCollapsed: boolean;
}

export default function TabIcon({
	tabName,
	tabIcon,
	isCollapsed,
}: TabIconProps) {
	return <div>{isCollapsed ? <p>{tabIcon}</p> : <p>{tabName}</p>}</div>;
}
