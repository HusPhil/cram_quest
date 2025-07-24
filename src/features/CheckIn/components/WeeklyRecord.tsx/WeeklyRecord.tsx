import React, { memo } from 'react';
import {
	CheckInStatus,
	WeeklyCheckInRead,
} from '../../../../services/api/schema/weekly_check_in_schema';

type WeeklyRecordProps = {
	weeklyCheckInRecord: WeeklyCheckInRead;
	handleCheckIn: () => void;
};

const days = [
	'monday',
	'tuesday',
	'wednesday',
	'thursday',
	'friday',
	'saturday',
	'sunday',
] as const; // 👈 important for TS type inference

const WeeklyRecord = ({
	weeklyCheckInRecord,
	handleCheckIn,
}: WeeklyRecordProps) => {
	const today = new Date();
	const dayName = today.toLocaleDateString('en-US', { weekday: 'long' });

	const getDayBoxStyle = (day: keyof WeeklyCheckInRead) => {
		const dayStatus = weeklyCheckInRecord[day] as CheckInStatus;

		if (
			dayStatus.is_future ||
			(day === dayName.toLowerCase() && !dayStatus.is_checked)
		) {
			return 'bg-secondary/75 border-white/25';
		} else if (dayStatus.is_checked) {
			return 'bg-success/10 border-success';
		} else {
			return 'bg-danger/5 border-danger/50 ';
		}
	};

	const getDayIndicatorStyle = (day: keyof WeeklyCheckInRead) => {
		const dayStatus = weeklyCheckInRecord[day] as CheckInStatus;
		if (day === dayName.toLowerCase()) {
			return 'bg-accent/50 animate-pulse';
		}
		if (dayStatus.is_future) {
			return 'bg-white/50';
		} else if (dayStatus.is_checked) {
			return 'bg-success';
		} else {
			return 'bg-danger';
		}
	};

	return (
		<div>
			<div className="flex items-end justify-between ">
				<div>
					<h2 className="text-lg my-3 font-bold text-accent text-center md:tes-xl lg:text-start lg:my-5">
						Weekly Check-in
					</h2>
					<p className="text-text text-xs hidden my-3 md:sm lg:block">
						Check in every day to earn weekly rewards!
					</p>
				</div>
				<div className="my-3">
					<button
						type="button"
						className="py-1 text-sm  px-5 bg-accent rounded-md mt-3 text-background"
						onClick={handleCheckIn}
					>
						<p>Check In</p>
					</button>
				</div>
			</div>
			<div className="grid grid-cols-7 gap-0 border border-accent/20 rounded-lg overflow-hidden md:gap-4 md:mx-0 md:rounded-none md:overflow-visible md:border-none">
				{days.map((day) => (
					<div
						key={day}
						className={`relative group cursor-pointer transition-all duration-200 
              ${getDayBoxStyle(day)} 
              md:border md:rounded-lg p-3 md:p-4 hover:bg-accent/10 hover:border-accent/50`}
					>
						<div
							className={`flex flex-col items-center justify-center space-y-2 md:space-y-1 lg:space-y-[0.5] lg:space-x-2 lg:flex-row`}
						>
							{day === dayName.toLowerCase() ? (
								<span className="capitalize text-xs md:text-sm font-medium text-accent/80 animate-pulse">
									{day.slice(0, 3)}
								</span>
							) : (
								<>
									<span className="capitalize text-xs md:text-sm font-medium text-text/80">
										{day.slice(0, 3)}
									</span>
								</>
							)}
							<div
								className={`w-2 h-2 rounded-full 
							${getDayIndicatorStyle(day)}`}
							/>
						</div>
					</div>
				))}
			</div>
			<p className="my-4 text-text text-xs text-center lg:hidden">
				Check in every day to earn weekly rewards!
			</p>
		</div>
	);
};

// export default useMemo(() => WeeklyRecord, []);
export default memo(WeeklyRecord);
