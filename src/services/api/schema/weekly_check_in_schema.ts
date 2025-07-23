// types/WeeklyCheckIn.ts

export interface CheckInStatus {
	is_checked: boolean;
	is_future: boolean;
}

export interface WeeklyCheckInRead {
	id: number;
	player_id: number;
	week_start_date: string; // ISO date string

	monday: CheckInStatus;
	tuesday: CheckInStatus;
	wednesday: CheckInStatus;
	thursday: CheckInStatus;
	friday: CheckInStatus;
	saturday: CheckInStatus;
	sunday: CheckInStatus;
}
