import React, { memo, use, useMemo } from 'react';

type CheckInRecord = {
  day: string;
  date: string;
  checkIn: boolean;
};

type WeeklyRecordProps = {
  weeklyCheckInRecord: CheckInRecord[];
};

const WeeklyRecord: React.FC<WeeklyRecordProps> = ({ weeklyCheckInRecord }) => {
  return (
    <div>
      <h2 className="text-xl font-bold text-accent mb-4 text-center lg:text-start">Weekly Check-in</h2>
      <p className="my-5 text-text text-xs hidden lg:block">
        Check in every day to earn weekly rewards!
      </p>
      <div className="grid grid-cols-7 gap-2 md:gap-4">
        {weeklyCheckInRecord.map(({ date, day, checkIn }) => (
          <div
            key={date}
            className={`relative group cursor-pointer transition-all duration-200
              ${checkIn ? 'bg-green-800/10 border-green-500/50' : 'bg-primary/5 border-primary/50 animate-pulse'} 
              border rounded-lg p-3 md:p-4 hover:bg-accent/10 hover:border-accent/50`}
            >
                <div className={`flex flex-col items-center justify-center space-y-2 lg:space-y-0 lg:space-x-2 lg:flex-row`}>
                    <span className="text-xs md:text-sm font-medium text-text/80">
                    {day.slice(0, 3)}
                    </span>
                    <div className={`w-2 h-2 rounded-full
                                    ${checkIn ? 'bg-green-600' : 'bg-primary'}`}/>
                </div>
            </div>
        ))}
      </div>
      <p className="my-5 text-text text-xs text-center lg:hidden">
        Check in every day to earn weekly rewards!
      </p>
    </div>
  );
};

// export default useMemo(() => WeeklyRecord, []);
export default memo(WeeklyRecord);