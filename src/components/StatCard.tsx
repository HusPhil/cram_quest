interface StatCardProps {
	label: String;
	value: number | String;
}

export default function StatCard({ label, value }: StatCardProps) {
	return (
		<div>
			<div className="flex flex-col border border-accent/50 bg-secondary/30 rounded-lg flex-1 w-16 max-w-24 items-center justify-center p-2">
				<p className="text-center line text-xs">{label}</p>
				<p className="text-accent">{value}</p>
			</div>
		</div>
	);
}
