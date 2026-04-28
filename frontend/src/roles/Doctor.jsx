import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import PatientDashboard from './Patient';

export default function DoctorDashboard() {
  const { user } = useOutletContext();
  const [selectedPatient, setSelectedPatient] = useState(null);

  const patientUpdates = [
    { id: 1, name: 'John Doe', status: 'At Risk', adherence: '65%', lastSeen: '2 hrs ago', color: 'text-red-600', bg: 'bg-red-50' },
    { id: 2, name: 'Jane Smith', status: 'Stable', adherence: '98%', lastSeen: '5 hrs ago', color: 'text-green-700', bg: 'bg-green-50' },
    { id: 3, name: 'Robert Fox', status: 'Stable', adherence: '92%', lastSeen: '1 day ago', color: 'text-green-700', bg: 'bg-green-50' },
  ];

  const quickStats = [
    { label: 'Total Patients', value: '42', sub: '+3 this week' },
    { label: 'Critical Alerts', value: '5', sub: 'Action required' },
    { label: 'Consultations', value: '12', sub: 'Today' },
  ];

  if (selectedPatient) {
    return (
      <div>
        <button 
          onClick={() => setSelectedPatient(null)}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
        >
          <span>← Back to Patient List</span>
        </button>
        <PatientDashboard selectedPatient={selectedPatient} />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Doctor Portal, Dr. {user.name}</h1>
        <p className="text-gray-500 text-sm mt-1.5">Monitor patient adherence and clinical alerts.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {quickStats.map(s => (
          <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <p className="text-xs font-semibold text-gray-500 uppercase mb-3">{s.label}</p>
            <p className="text-3xl font-black text-gray-900 mb-1">{s.value}</p>
            <p className="text-xs text-gray-400">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50">
          <h2 className="font-bold text-gray-900 text-sm">Recent Patient Activity</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Adherence</th>
                <th className="px-6 py-4">Last Activity</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {patientUpdates.map((p, i) => (
                <tr 
                  key={i} 
                  className="hover:bg-gray-50 transition-colors cursor-pointer group"
                  onClick={() => setSelectedPatient(p)}
                >
                  <td className="px-6 py-4 font-semibold text-gray-900">{p.name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${p.bg} ${p.color}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700">{p.adherence}</td>
                  <td className="px-6 py-4 text-gray-400">{p.lastSeen}</td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-xs font-bold text-gray-400 group-hover:text-gray-900 transition-colors">View Details →</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
