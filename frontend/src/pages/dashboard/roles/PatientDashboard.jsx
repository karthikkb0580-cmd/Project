import { useOutletContext } from 'react-router-dom';
import { useState } from 'react';

export default function PatientDashboard({ selectedPatient, isDoctorView }) {
    const { user } = useOutletContext();
    const [meds, setMeds] = useState([
        { id: 1, name: 'Metformin 500mg', type: 'Tablet', frequency: 'Twice Daily', time: '8 AM & 9 PM', status: 'Active' },
        { id: 2, name: 'Lisinopril 10mg', type: 'Tablet', frequency: 'Once Daily', time: '2 PM', status: 'Active' },
        { id: 3, name: 'Atorvastatin 20mg', type: 'Tablet', frequency: 'Once Daily', time: '6 PM', status: 'Active' },
    ]);

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

    const removeMed = (id) => {
        if (window.confirm('Are you sure you want to remove this medication?')) {
            setMeds(meds.filter(m => m.id !== id));
        }
    };

    const addMed = () => {
        const name = window.prompt('Enter medication name (e.g. Aspirin 75mg):');
        if (name) {
            const newMed = {
                id: Date.now(),
                name,
                type: 'Tablet',
                frequency: 'Once Daily',
                time: '9 AM',
                status: 'Active'
            };
            setMeds([...meds, newMed]);
        }
    };

    return (
        <div className="animate-fade-in">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 tracking-tight">
                        {selectedPatient ? `Monitoring: ${selectedPatient.name}` : `Patient Overview, ${user.name}`}
                    </h1>
                    <p className="text-gray-500 text-sm mt-1.5">
                        {selectedPatient ? `Comprehensive clinical review for ${selectedPatient.name}.` : 'Track your medications and daily health goals.'}
                    </p>
                </div>
                {isDoctorView && (
                    <button 
                        onClick={addMed}
                        className="bg-gray-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-800 transition-all shadow-sm"
                    >
                        + Prescribe New Med
                    </button>
                )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                {stats.map(s => (
                    <div key={s.label} className={`bg-white border ${s.border} rounded-xl p-5 shadow-sm`}>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">{s.label}</p>
                        <p className="text-3xl font-black text-gray-900 mb-1">{s.value}</p>
                        <p className="text-xs text-gray-400">{s.sub}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Medication Management */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50 bg-gray-50/50">
                            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Active Medications</h2>
                            <span className="text-[10px] font-black text-gray-400 bg-white px-2 py-1 rounded border border-gray-100">{meds.length} TOTAL</span>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {meds.map((med) => (
                                <div key={med.id} className="flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-lg">💊</div>
                                        <div>
                                            <p className="text-sm font-black text-gray-900">{med.name}</p>
                                            <p className="text-xs text-gray-400 font-medium">{med.frequency} · {med.time}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-bold bg-green-50 text-green-700 px-2.5 py-1 rounded-full uppercase tracking-wider">
                                            {med.status}
                                        </span>
                                        {isDoctorView && (
                                            <button 
                                                onClick={() => removeMed(med.id)}
                                                className="w-8 h-8 rounded-lg border border-gray-100 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 hover:border-red-100 transition-all"
                                                title="Remove Medication"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Schedule Log */}
                    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                        <div className="px-6 py-4 border-b border-gray-50">
                            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Recent Activity Log</h2>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {log.map((item, i) => (
                                <div key={i} className="flex items-center justify-between px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-2 h-2 rounded-full ${item.dot}`} />
                                        <span className="text-xs text-gray-400 font-bold w-16">{item.time}</span>
                                        <span className="text-sm text-gray-700 font-medium">{item.med}</span>
                                    </div>
                                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${item.badge}`}>
                                        {item.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                    <div className="bg-gray-900 rounded-2xl p-6 text-white shadow-xl">
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Clinical Insights</h3>
                        <div className="space-y-4">
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <p className="text-xs font-bold text-green-400 mb-1">POSITIVE TREND</p>
                                <p className="text-sm leading-relaxed text-gray-300">Morning adherence has improved by 12% since the last update.</p>
                            </div>
                            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                                <p className="text-xs font-bold text-yellow-400 mb-1">SUGGESTION</p>
                                <p className="text-sm leading-relaxed text-gray-300">Consider adjusting Atorvastatin timing if evening compliance drops.</p>
                            </div>
                        </div>
                    </div>

                    {isDoctorView && (
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold text-gray-900 text-sm mb-4">Doctor Actions</h3>
                            <div className="space-y-3">
                                <button className="w-full text-left px-4 py-3 rounded-xl border border-gray-100 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-all">
                                    📄 Export Adherence Report
                                </button>
                                <button className="w-full text-left px-4 py-3 rounded-xl border border-gray-100 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-all">
                                    🔔 Send Nudge Notification
                                </button>
                                <button className="w-full text-left px-4 py-3 rounded-xl border border-red-100 text-xs font-bold text-red-600 hover:bg-red-50 transition-all">
                                    ⚠️ Flag for Urgent Follow-up
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
