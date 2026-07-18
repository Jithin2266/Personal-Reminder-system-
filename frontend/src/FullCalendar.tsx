import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function FullCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  // Dummy events
  const events: Record<number, { title: string, color: string }[]> = {
    18: [{ title: 'Credit Card Due', color: 'bg-blue-500' }],
    20: [{ title: "Mom's Birthday", color: 'bg-pink-500' }],
    25: [{ title: 'Internet Bill', color: 'bg-green-500' }]
  };

  const days = [];
  // Empty slots before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="min-h-[120px] p-2 border border-slate-700/30 bg-slate-900/20"></div>);
  }

  // Actual days
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = new Date().getDate() === i && new Date().getMonth() === month && new Date().getFullYear() === year;
    const dayEvents = events[i] || [];

    days.push(
      <div key={`day-${i}`} className={`min-h-[120px] p-2 border border-slate-700/30 hover:bg-slate-800/40 transition-colors flex flex-col ${isToday ? 'bg-primary/5 border-primary/30' : 'glass'}`}>
        <div className="flex justify-between items-center mb-2">
          <span className={`text-sm font-semibold w-8 h-8 flex items-center justify-center rounded-full ${isToday ? 'bg-primary text-dark' : 'text-slate-300'}`}>
            {i}
          </span>
        </div>
        <div className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
          {dayEvents.map((ev, idx) => (
            <div key={idx} className={`text-xs px-2 py-1 rounded text-white truncate ${ev.color}`}>
              {ev.title}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Calendar</h2>
          <p className="text-slate-400">View and manage all your events.</p>
        </div>
        
        <div className="flex items-center gap-4 glass px-4 py-2 rounded-xl">
          <button onClick={prevMonth} className="p-2 text-slate-400 hover:text-white transition-colors"><ChevronLeft className="w-5 h-5" /></button>
          <span className="text-lg font-bold text-white min-w-[150px] text-center">{monthName} {year}</span>
          <button onClick={nextMonth} className="p-2 text-slate-400 hover:text-white transition-colors"><ChevronRight className="w-5 h-5" /></button>
        </div>
      </header>

      <div className="flex-1 glass rounded-2xl overflow-hidden flex flex-col border border-slate-700/50">
        <div className="grid grid-cols-7 bg-slate-800/80 border-b border-slate-700/50">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="py-4 text-center text-sm font-bold text-slate-400 uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>
        <div className="flex-1 grid grid-cols-7 grid-rows-5 overflow-y-auto">
          {days}
        </div>
      </div>
    </div>
  );
}
