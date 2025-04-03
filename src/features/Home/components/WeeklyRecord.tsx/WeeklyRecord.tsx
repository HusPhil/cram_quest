import React from 'react';

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
      <h2 className="text-xl font-bold text-accent mb-4 text-center">Weekly Check-in</h2>
      <div className="grid grid-cols-7 gap-2 md:gap-4">
        {weeklyCheckInRecord.map(({ date, day, checkIn }) => (
          <div
            key={date}
            className={`relative group cursor-pointer transition-all duration-200
              ${checkIn ? 'bg-green-600/20 border-green-600/50' : 'bg-secondary/50 border-secondary/50'} 
              border rounded-lg p-3 md:p-4 hover:scale-105`}
            >
                <div className="flex flex-col items-center justify-center space-y-2 lg:space-y-0 lg:space-x-2 lg:flex-row">
                    <span className="text-xs md:text-sm font-medium text-text/80">
                    {day.slice(0, 3)}
                    </span>
                    <div className={`w-2 h-2 rounded-full animate-pulse
                                    ${checkIn ? 'bg-green-600' : 'bg-primary'}`}/>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyRecord;
