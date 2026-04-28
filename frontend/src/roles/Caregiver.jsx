import { useOutletContext } from 'react-router-dom';

export default function CaregiverDashboard() {
  const { user } = useOutletContext();

  const monitoredPatients = [
    { name: 'Sarah Miller (Mother)', status: 'Missed Dose', time: '10:30 AM', med: 'Blood Pressure', urgency: 'high' },
    { name: 'James Miller (Father)', status: 'On Track', time: '8:00 AM', med: 'Vitamins', urgency: 'low' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Caregiver Dashboard, {user.name}</h1>
        <p className="text-gray-500 text-sm mt-1.5">Manage and monitor health schedules for your loved ones.</p>
      </div>

      <div className="grid grid-cols-1 gap-5">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-1">Monitored Accounts</h2>
        {monitoredPatients.map((p, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${p.urgency === 'high' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                  {p.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-black text-gray-900">{p.name}</h3>
                  <p className="text-xs text-gray-500">Last medication: {p.med} at {p.time}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider ${p.urgency === 'high' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {p.status}
                </div>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-800 transition-colors">
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
        
        <button className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-2 hover:border-gray-400 transition-colors text-gray-400 group">
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-gray-100">
            <span className="text-2xl">+</span>
          </div>
          <span className="text-sm font-bold text-gray-500">Add Patient to Monitor</span>
        </button>
      </div>
    </div>
  );
}
