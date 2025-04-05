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
      <h2 className="text-xl font-bold text-accent text-center lg:text-start my-5">Weekly Check-in</h2>
      <p className="text-text text-xs hidden my-3 lg:block ">
        Check in every day to earn weekly rewards!
      </p>
      <div className="grid grid-cols-7 gap-0 border border-accent/20 rounded-lg overflow-hidden md:gap-4 md:mx-0 md:rounded-none md:overflow-visible md:border-none">
        {weeklyCheckInRecord.map(({ date, day, checkIn }) => (
          <div
            key={date}
            className={`relative group cursor-pointer transition-all duration-200 
              ${checkIn ? 'bg-green-800/10 border-green-500/50' : 'bg-primary/5 border-primary/50 animate-pulse'} 
              md:border md:rounded-lg p-3 md:p-4 hover:bg-accent/10 hover:border-accent/50`}
            >
                <div className={`flex flex-col items-center justify-center space-y-2 md:space-y-1 lg:space-y-[0.5] lg:space-x-2 lg:flex-row`}>
                    <span className="text-xs md:text-sm font-medium text-text/80">
                    {day.slice(0, 3)}
                    </span>
                    <div className={`w-2 h-2 rounded-full
                                    ${checkIn ? 'bg-green-600' : 'bg-primary'}`}/>
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