import { Trash2, Edit, CreditCard, Gift, FileText, Heart } from 'lucide-react';

interface RemindersListProps {
  reminders: any[];
  onDelete: (id: string) => void;
}

export default function RemindersList({ reminders, onDelete }: RemindersListProps) {
  return (
    <div className="h-full flex flex-col">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">All Reminders</h2>
          <p className="text-slate-400">Manage your entire list of reminders.</p>
        </div>
      </header>

      <div className="flex-1 glass rounded-2xl overflow-hidden flex flex-col border border-slate-700/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-800/80 border-b border-slate-700/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Reminder Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Reminder Time</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {reminders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    No reminders found. Create one to get started!
                  </td>
                </tr>
              ) : (
                reminders.map(r => {
                  const rDate = r.date ? new Date(r.date) : new Date();
                  const isPast = rDate < new Date() && rDate.getDate() !== new Date().getDate();

                  return (
                    <tr key={r.id} className="hover:bg-slate-800/40 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-medium text-white">{r.title}</p>
                        {r.description && <p className="text-xs text-slate-400 truncate max-w-[200px]">{r.description}</p>}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                          {r.category === 'Credit Card' && <CreditCard className="w-3.5 h-3.5 text-blue-400" />}
                          {r.category === 'Birthday' && <Gift className="w-3.5 h-3.5 text-pink-400" />}
                          {r.category === 'Billing' && <FileText className="w-3.5 h-3.5 text-green-400" />}
                          {r.category === 'Event' && <Heart className="w-3.5 h-3.5 text-red-400" />}
                          {r.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-md text-xs font-bold
                          ${r.priority === 'High' ? 'bg-red-500/20 text-red-400' : ''}
                          ${r.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                          ${r.priority === 'Low' || !r.priority ? 'bg-blue-500/20 text-blue-400' : ''}
                        `}>
                          {r.priority || 'Low'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-300">{r.date} {r.time && `at ${r.time}`}</p>
                        <p className="text-xs text-slate-500">{r.repeat !== 'None' ? r.repeat : 'One-time'}</p>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
                          ${isPast ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-300 border border-slate-700'}
                        `}>
                          <span className={`w-1.5 h-1.5 rounded-full ${isPast ? 'bg-emerald-400' : 'bg-slate-400'}`}></span>
                          {isPast ? 'Completed' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            className="p-1.5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => onDelete(r.id)}
                            className="p-1.5 text-slate-400 hover:text-red-400 bg-slate-800 hover:bg-slate-700 rounded-md transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
