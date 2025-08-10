import Modal from '../../../components/Modal';
import { PerfectWeeklyCheckInRewardRead } from '../../../services/api/schema/weekly_check_in_schema';

interface PerfectWeeklyChecInRewardModalProps {
	isOpen: boolean;
	weeklyReward: PerfectWeeklyCheckInRewardRead;
	title: string;
	onClose: () => void;
}

function PerfectWeeklyChecInRewardModal({
	title,
	onClose,
	isOpen,
	weeklyReward,
}: PerfectWeeklyChecInRewardModalProps) {
	return (
		<Modal title={title} isOpen={isOpen} onClose={onClose}>
			<div className="w-full flex justify-between gap-3">
				<div className="flex flex-1 flex-col justify-center items-center space-y-1 bg-success/5 p-3 rounded-md">
					<p className="text-sm">EXPERIENCE GAINED</p>
					<div className="space-y-3 flex flex-col justify-center items-center">
						<div className="flex items-center gap-3">
							<p className={`text-4xl font-bold text-success`}>
								+{weeklyReward.reward_xp}
							</p>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default PerfectWeeklyChecInRewardModal;
