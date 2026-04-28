import { useOutletContext } from 'react-router-dom';

export default function PatientDashboard({ selectedPatient }) {
    const { user } = useOutletContext();
    const displayUser = selectedPatient || user;

    const stats = [
        { label: 'Doses Taken', value: '142', sub: 'This month', border: 'border-gray-200' },
        { label: 'Adherence Rate', value: '94%', sub: 'Last 30 days', border: 'border-green-200' },
        { label: 'Missed Doses', value: '9', sub: 'This month', border: 'border-red-200' },
        { label: 'Next Reminder', value: '8 PM', sub: 'Metformin 500mg', border: 'border-blue-200' },
    ];

    const log = [
        { time: '8:00 AM', med: 'Metformin 500mg', status: 'Taken', dot: 'bg-green-400', badge: 'bg-green-50 text-green-700' },
        { time: '2:00 PM', med: 'Lisinopril 10mg', status: 'Taken', dot: 'bg-green-400', badge: 'bg-green-50 text-green-700' },
        { time: '6:00 PM', med: 'Atorvastatin 20mg', status: 'Missed', dot: 'bg-red-400', badge: 'bg-red-50 text-red-600' },
        { time: '9:00 PM', med: 'Metformin 500mg', status: 'Pending', dot: 'bg-yellow-400', badge: 'bg-yellow-50 text-yellow-700' },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                    {selectedPatient ? `Monitoring: ${selectedPatient.name}` : `Patient Overview, ${user.name}`}
                </h1>
                <p className="text-gray-500 text-sm mt-1.5">
                    {selectedPatient ? `Viewing real-time adherence data for ${selectedPatient.name}.` : 'Track your medications and daily health goals.'}
                </p>
            </div>

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
                {stats.map(s => (
                    <div key={s.label} className={`bg-white border ${s.border} rounded-xl p-5 shadow-sm`}>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">{s.label}</p>
                        <p className="text-3xl font-black text-gray-900 mb-1">{s.value}</p>
                        <p className="text-xs text-gray-400">{s.sub}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
                    <h2 className="font-bold text-gray-900 text-sm">Medication Schedule</h2>
                </div>
                <div className="divide-y divide-gray-50">
                    {log.map((item, i) => (
                        <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`w-2 h-2 rounded-full ${item.dot}`} />
                                <span className="text-xs text-gray-400 font-medium w-16">{item.time}</span>
                                <span className="text-sm text-gray-700 font-medium">{item.med}</span>
                            </div>
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.badge}`}>
                                {item.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}