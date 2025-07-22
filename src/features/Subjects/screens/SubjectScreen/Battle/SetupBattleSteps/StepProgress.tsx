import { SetupBattleStep } from '../../../../modals/StartBattleModal';

interface StepProgressProps {
	steps: SetupBattleStep[];
	currentStep: number;
}

export default function StepProgress({
	steps,
	currentStep,
}: StepProgressProps) {
	return (
		<div className="w-full">
			<div className="flex justify-between mb-2 px-1 pb-1">
				{steps.map((step, index) => (
					<div
						key={index}
						className={`flex flex-col items-center ${
							index <= currentStep
								? 'text-accent'
								: 'text-text/50'
						}`}
					>
						<div
							className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
								index < currentStep
									? 'bg-accent text-background border-accent'
									: index === currentStep
									? 'border-accent text-accent'
									: 'border-text/30 text-text/50'
							}`}
						>
							{index < currentStep ? (
								<svg
									className="w-4 h-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							) : (
								index + 1
							)}
						</div>
						<span className="text-xs md:text-sm mt-2">
							{step.name}
						</span>
					</div>
				))}
			</div>
			<div className="relative w-full h-1 bg-text/20 rounded-full">
				<div
					className="absolute h-full bg-accent rounded-full transition-all duration-300"
					style={{
						width: `${(currentStep / (steps.length - 1)) * 100}%`,
					}}
				/>
			</div>
		</div>
	);
}
