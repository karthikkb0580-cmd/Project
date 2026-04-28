import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';
import PatientDashboard from './PatientDashboard';

export default function DoctorDashboard() {
    const { user } = useOutletContext();
    const [selectedPatient, setSelectedPatient] = useState(null);

    const patientUpdates = [
        { id: 1, name: 'John Doe', status: 'At Risk', adherence: '65%', lastSeen: '2 hrs ago', color: 'text-red-600', bg: 'bg-red-50', avatar: 'JD' },
        { id: 2, name: 'Jane Smith', status: 'Stable', adherence: '98%', lastSeen: '5 hrs ago', color: 'text-green-700', bg: 'bg-green-50', avatar: 'JS' },
        { id: 3, name: 'Robert Fox', status: 'Stable', adherence: '92%', lastSeen: '1 day ago', color: 'text-green-700', bg: 'bg-green-50', avatar: 'RF' },
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
                <PatientDashboard selectedPatient={selectedPatient} isDoctorView={true} />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">Doctor Portal, Dr. {user.name}</h1>
                <p className="text-gray-500 text-sm mt-1.5">Monitor patient adherence and manage clinical care plans.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                {quickStats.map(s => (
                    <div key={s.label} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-3">{s.label}</p>
                        <p className="text-3xl font-black text-gray-900 mb-1">{s.value}</p>
                        <p className="text-xs text-gray-400">{s.sub}</p>
                    </div>
                ))}
            </div>

            <h2 className="font-black text-gray-900 text-lg mb-6">Patient Accounts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {patientUpdates.map((p) => (
                    <div
                        key={p.id}
                        onClick={() => setSelectedPatient(p)}
                        className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all cursor-pointer group"
                    >
                        <div className="flex items-center gap-4 mb-5">
                            <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center font-bold text-white text-lg">
                                {p.avatar}
                            </div>
                            <div className="min-w-0">
                                <h3 className="font-bold text-gray-900 truncate">{p.name}</h3>
                                <p className="text-xs text-gray-400">Last activity: {p.lastSeen}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Adherence</p>
                                <p className="text-sm font-black text-gray-900">{p.adherence}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${p.bg} ${p.color}`}>
                                {p.status}
                            </span>
                        </div>

                        <div className="mt-5 text-right">
                            <span className="text-xs font-bold text-gray-400 group-hover:text-gray-900 transition-colors">View Patient File →</span>
                        </div>
                    </div>
                ))}

                <button className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:border-gray-400 transition-all group min-h-[180px]">
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 text-xl group-hover:bg-gray-100 transition-colors">
                        +
                    </div>
                    <span className="text-sm font-bold text-gray-400">Register New Patient</span>
                </button>
            </div>
        </div>
    );
}
