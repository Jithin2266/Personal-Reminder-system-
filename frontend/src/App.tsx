import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Bell, Plus, Home, CreditCard, Gift, Heart, FileText, LogOut, Trash2 } from 'lucide-react';
import CreateReminderModal from './CreateReminderModal';
import FullCalendar from './FullCalendar';
import RemindersList from './RemindersList';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [calendarView, setCalendarView] = useState('weekly');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const userName = sessionStorage.getItem('userName') || 'User';
  const userMobile = sessionStorage.getItem('userMobile') || 'guest';
  const userInitial = userName.charAt(0).toUpperCase();

  const [reminders, setReminders] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(`reminders_${userMobile}`);
    if (stored) {
      setReminders(JSON.parse(stored));
    } else {
      setReminders([]);
      localStorage.setItem(`reminders_${userMobile}`, JSON.stringify([]));
    }
  }, [userMobile]);

  const handleAddReminder = (reminder: any) => {
    const updated = [...reminders, reminder];
    setReminders(updated);
    localStorage.setItem(`reminders_${userMobile}`, JSON.stringify(updated));
  };

  const handleDeleteReminder = (id: string) => {
    const updated = reminders.filter(r => r.id !== id);
    setReminders(updated);
    localStorage.setItem(`reminders_${userMobile}`, JSON.stringify(updated));
  };

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = '/';
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Afternoon';
    if (hour >= 17 && hour < 21) return 'Good Evening';
    return 'Good Night';
  };

  return (
    <>
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] pointer-events-none"></div>

      <div className="flex h-screen overflow-hidden relative z-10">
        {/* Sidebar */}
        <aside className="w-64 glass border-r border-slate-700/50 hidden md:flex flex-col">
          <div className="p-6">
            <h1 className="text-2xl font-bold gradient-text">ReminderPro</h1>
          </div>
          <nav className="flex-1 px-4 space-y-2 mt-4">
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              <Home className="w-5 h-5" />
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab('calendar')} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'calendar' ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              <CalendarIcon className="w-5 h-5" />
              Calendar
            </button>
            <button 
              onClick={() => setActiveTab('reminders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === 'reminders' ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
            >
              <Bell className="w-5 h-5" />
              Reminders
            </button>
          </nav>
          
          <div className="p-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-4">Categories</p>
            <div className="space-y-1">
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-400 hover:text-slate-200"><CreditCard className="w-4 h-4 text-blue-400" /> Credit Cards</a>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-400 hover:text-slate-200"><Gift className="w-4 h-4 text-pink-400" /> Birthdays</a>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-400 hover:text-slate-200"><Heart className="w-4 h-4 text-red-400" /> Marriages & Events</a>
              <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-400 hover:text-slate-200"><FileText className="w-4 h-4 text-green-400" /> Billing / Invoices</a>
            </div>
          </div>

          <div className="p-4 border-t border-slate-700/50">
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center font-bold text-dark shadow-lg">{userInitial}</div>
                <div>
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs text-slate-400">Free Plan</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => {
                    localStorage.clear();
                    sessionStorage.clear();
                    window.location.href = '/';
                  }} 
                  className="p-2 text-slate-400 hover:text-red-400 transition-colors" 
                  title="Wipe All Data & Log Out"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-400 transition-colors" title="Log Out">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {activeTab === 'calendar' ? (
            <FullCalendar reminders={reminders} />
          ) : activeTab === 'reminders' ? (
            <RemindersList reminders={reminders} onDelete={handleDeleteReminder} />
          ) : (
            <>
              <header className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-1">{getGreeting()}, {userName.split(' ')[0]}! 👋</h2>
                  <p className="text-slate-400">Here's your schedule for today.</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-primary hover:bg-primary/90 text-dark px-5 py-2.5 rounded-xl font-bold transition-colors shadow-[0_0_15px_rgba(255,215,0,0.5)] flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  New Reminder
                </button>
              </header>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column (Events & Reminders) */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* High Priority */}
                  <section className="glass rounded-2xl p-6 border border-red-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[50px] rounded-full"></div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                      Action Needed Soon
                    </h3>
                    <div className="space-y-3 relative z-10">
                      {reminders.map(r => (
                        <div key={r.id} className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 flex items-center justify-between group hover:bg-slate-800/60 transition-colors">
                          <div className="flex items-center gap-4">
                            <input type="checkbox" className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-primary focus:ring-primary focus:ring-offset-slate-900" />
                            <div>
                              <p className="font-medium text-slate-200">{r.title}</p>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded flex items-center gap-1">
                                  {r.category === 'Credit Card' && <CreditCard className="w-3 h-3" />}
                                  {r.category === 'Birthday' && <Gift className="w-3 h-3" />}
                                  {r.category === 'Billing' && <FileText className="w-3 h-3" />}
                                  {r.category === 'Event' && <Heart className="w-3 h-3" />}
                                  {r.category}
                                </span>
                                <p className="text-xs text-slate-400 flex items-center gap-1">
                                  {r.date} {r.time}
                                </p>
                              </div>
                            </div>
                          </div>
                          <button onClick={() => handleDeleteReminder(r.id)} className="p-2 text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Right Column (Calendar Summary) */}
                <div className="space-y-6">
                  <section className="glass rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-white">July 2026</h3>
                      
                      {/* View Toggle */}
                      <div className="flex bg-slate-800/80 rounded-lg p-1 border border-slate-700/50">
                        <button 
                            onClick={() => setCalendarView('weekly')}
                            className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${calendarView === 'weekly' ? 'bg-primary text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            Weekly
                        </button>
                        <button 
                            onClick={() => setCalendarView('monthly')}
                            className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${calendarView === 'monthly' ? 'bg-primary text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
                        >
                            Monthly
                        </button>
                      </div>
                    </div>

                    {calendarView === 'monthly' ? (
                      (() => {
                        const today = new Date();
                        const year = today.getFullYear();
                        const month = today.getMonth();
                        const daysInMonth = new Date(year, month + 1, 0).getDate();
                        const firstDay = new Date(year, month, 1).getDay();
                        
                        const days = [];
                        for (let i = 0; i < firstDay; i++) {
                          days.push(<div key={`empty-${i}`} className="p-2 text-slate-500"></div>);
                        }

                        for (let i = 1; i <= daysInMonth; i++) {
                          const isToday = today.getDate() === i;
                          const hasReminders = reminders.some(r => {
                            if (!r.date) return false;
                            const rDate = new Date(r.date);
                            return rDate.getDate() === i && rDate.getMonth() === month && rDate.getFullYear() === year;
                          });

                          days.push(
                            <div key={`day-${i}`} className={`p-2 rounded-lg cursor-pointer transition-colors relative ${isToday ? 'bg-primary text-dark font-bold shadow-[0_0_10px_rgba(255,215,0,0.4)]' : 'hover:bg-slate-700'}`}>
                              {i}
                              {hasReminders && (
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full"></span>
                              )}
                            </div>
                          );
                        }

                        return (
                          <>
                            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-slate-400 font-medium">
                              <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center text-sm">
                              {days}
                            </div>
                          </>
                        );
                      })()
                    ) : (
                      <>
                        {/* Weekly Timeline View */}
                        <div className="space-y-3">
                            {reminders.length === 0 ? (
                              <p className="text-slate-500 text-sm text-center py-4">No events this week.</p>
                            ) : (
                              reminders.map(r => {
                                const rDate = r.date ? new Date(r.date) : new Date();
                                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                                const dayName = days[rDate.getDay()];
                                const dateNum = rDate.getDate();
                                
                                let borderColor = 'border-l-slate-500';
                                if (r.category === 'Credit Card') borderColor = 'border-l-blue-500';
                                if (r.category === 'Birthday') borderColor = 'border-l-pink-500';
                                if (r.category === 'Billing') borderColor = 'border-l-green-500';
                                if (r.category === 'Event') borderColor = 'border-l-red-500';

                                return (
                                  <div key={`weekly-${r.id}`} className="flex gap-3">
                                      <div className="flex flex-col items-center justify-center bg-slate-800/50 rounded-xl p-3 w-16 text-slate-400">
                                          <span className="text-xs">{dayName}</span>
                                          <span className="text-lg font-bold text-white">{dateNum}</span>
                                      </div>
                                      <div className={`flex-1 glass p-3 rounded-xl border-l-2 ${borderColor}`}>
                                          <p className="text-sm font-medium text-white">{r.title}</p>
                                          <p className="text-xs text-slate-400">{r.time || 'All Day'}</p>
                                      </div>
                                  </div>
                                );
                              })
                            )}
                        </div>
                      </>
                    )}
                  </section>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      <CreateReminderModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddReminder={handleAddReminder} />
    </>
  );
}

export default App;
