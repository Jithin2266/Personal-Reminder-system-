import { useState } from 'react';
import { Calendar as CalendarIcon, Bell, Plus, Home, CreditCard, Gift, Heart, FileText } from 'lucide-react';

function App() {
  const [calendarView, setCalendarView] = useState('weekly');

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
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-primary/20 text-primary rounded-xl font-medium transition-colors">
              <Home className="w-5 h-5" />
              Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-xl font-medium transition-colors">
              <CalendarIcon className="w-5 h-5" />
              Calendar
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 rounded-xl font-medium transition-colors">
              <Bell className="w-5 h-5" />
              Reminders
            </a>
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
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center font-bold text-white shadow-lg">J</div>
              <div>
                <p className="text-sm font-medium">Jithin Raj</p>
                <p className="text-xs text-slate-400">Free Plan</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <header className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-1">Good Morning, Jithin! 👋</h2>
              <p className="text-slate-400">Here's your schedule for today.</p>
            </div>
            <button className="bg-primary hover:bg-primary/90 text-dark px-5 py-2.5 rounded-xl font-bold transition-colors shadow-[0_0_15px_rgba(255,215,0,0.5)] flex items-center gap-2">
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
                  <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 flex items-center justify-between group hover:bg-slate-800/60 transition-colors">
                    <div className="flex items-center gap-4">
                      <input type="checkbox" className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-primary focus:ring-primary focus:ring-offset-slate-900" />
                      <div>
                        <p className="font-medium text-slate-200">HDFC Credit Card Bill</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded flex items-center gap-1">
                            <CreditCard className="w-3 h-3" /> Credit Card
                          </span>
                          <p className="text-xs text-red-400 flex items-center gap-1">
                            Due in 2 days
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Today's Events */}
              <section>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-white">Upcoming Events</h3>
                    <button className="text-sm text-primary hover:text-primary/80">View All</button>
                </div>
                <div className="space-y-4">
                  {/* Event Card */}
                  <div className="glass p-5 rounded-2xl flex gap-5 items-center hover:scale-[1.01] transition-transform cursor-pointer border-l-4 border-l-pink-500">
                    <div className="text-center w-16">
                      <p className="text-lg font-bold text-white">July 20</p>
                      <p className="text-xs text-slate-400">Saturday</p>
                    </div>
                    <div className="h-10 w-px bg-slate-700/50"></div>
                    <div>
                      <h4 className="font-semibold text-white">Mom's Birthday</h4>
                      <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-0.5 rounded inline-flex items-center gap-1 mt-1">
                        <Gift className="w-3 h-3" /> Birthday
                      </span>
                    </div>
                  </div>
                  {/* Event Card */}
                  <div className="glass p-5 rounded-2xl flex gap-5 items-center hover:scale-[1.01] transition-transform cursor-pointer border-l-4 border-l-green-500">
                    <div className="text-center w-16">
                      <p className="text-lg font-bold text-white">July 25</p>
                      <p className="text-xs text-slate-400">Thursday</p>
                    </div>
                    <div className="h-10 w-px bg-slate-700/50"></div>
                    <div>
                      <h4 className="font-semibold text-white">Internet Bill Invoice</h4>
                      <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded inline-flex items-center gap-1 mt-1">
                        <FileText className="w-3 h-3" /> Billing
                      </span>
                    </div>
                  </div>
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
                  <>
                    {/* Monthly Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2 text-slate-400 font-medium">
                      <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center text-sm">
                      <div className="p-2 text-slate-500">28</div><div className="p-2 text-slate-500">29</div><div className="p-2 text-slate-500">30</div>
                      <div className="p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">1</div>
                      <div className="p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">2</div>
                      <div className="p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">3</div>
                      <div className="p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">4</div>
                      <div className="p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">5</div>
                      <div className="p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">6</div>
                      <div className="p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">7</div>
                      <div className="p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">8</div>
                      <div className="p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors relative">
                        9 <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></span>
                      </div>
                      <div className="p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">10</div>
                      <div className="p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">11</div>
                      <div className="p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">12</div>
                      <div className="p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">13</div>
                      <div className="p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">14</div>
                      <div className="p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">15</div>
                      <div className="p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">16</div>
                      <div className="p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">17</div>
                      {/* Current Day */}
                      <div className="p-2 bg-primary text-dark font-bold rounded-lg cursor-pointer shadow-[0_0_10px_rgba(255,215,0,0.4)] relative">18</div>
                      <div className="p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors">19</div>
                      <div className="p-2 hover:bg-slate-700 rounded-lg cursor-pointer transition-colors relative">
                        20 <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-pink-500 rounded-full"></span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Weekly Timeline View */}
                    <div className="space-y-3">
                        <div className="flex gap-3">
                            <div className="flex flex-col items-center justify-center bg-slate-800/50 rounded-xl p-3 w-16 text-slate-400">
                                <span className="text-xs">Wed</span>
                                <span className="text-lg font-bold text-white">18</span>
                            </div>
                            <div className="flex-1 glass p-3 rounded-xl border-l-2 border-l-blue-500">
                                <p className="text-sm font-medium text-white">Credit Card Due</p>
                                <p className="text-xs text-slate-400">12:00 PM</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex flex-col items-center justify-center bg-slate-800/50 rounded-xl p-3 w-16 text-slate-400">
                                <span className="text-xs">Sat</span>
                                <span className="text-lg font-bold">20</span>
                            </div>
                            <div className="flex-1 glass p-3 rounded-xl border-l-2 border-l-pink-500">
                                <p className="text-sm font-medium text-white">Mom's Birthday</p>
                                <p className="text-xs text-slate-400">All Day</p>
                            </div>
                        </div>
                    </div>
                  </>
                )}
              </section>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
