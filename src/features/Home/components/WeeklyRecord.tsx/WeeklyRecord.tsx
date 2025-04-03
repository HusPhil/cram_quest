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
    <div className="p-6 rounded-lg bg-gray-800/50 border border-amber-500/20 backdrop-blur-sm">
      <h2 className="text-xl font-bold text-amber-400 mb-4 text-center">Weekly Check-in</h2>
      <div className="grid grid-cols-7 gap-2 md:gap-4">
        {weeklyCheckInRecord.map(({ date, day, checkIn }) => (
          <div
            key={date}
            className={`relative group cursor-pointer transition-all duration-200
              ${checkIn ? 'bg-green-600/20 border-green-600/50' : 'bg-secondary/50 border-secondary/50'} 
              border rounded-lg p-3 md:p-4 hover:scale-105`}
          >
            <div className="flex flex-col items-center space-y-2">
              <span className="text-xs md:text-sm font-medium text-text/80">
                {day.slice(0, 3)}
              </span>
              <div
                className={`w-2 h-2 rounded-full animate-pulse ${
                  checkIn ? 'bg-green-600' : 'bg-primary'
                }`}
              ></div>
            </div>
            {/* Hover Effect */}
            <div className="absolute inset-0 bg-amber-400/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyRecord;
