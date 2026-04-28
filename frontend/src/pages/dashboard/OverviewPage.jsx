import { useOutletContext } from 'react-router-dom';
import PatientDashboard from './roles/PatientDashboard';
import DoctorDashboard from './roles/DoctorDashboard';
import CaregiverDashboard from './roles/CaregiverDashboard';

export default function OverviewPage() {
  const { user } = useOutletContext();
  
  // Default to patient if role is not strictly defined
  const role = user?.role?.toLowerCase() || 'patient';

  switch (role) {
    case 'doctor':
      return <DoctorDashboard />;
    case 'caregiver':
      return <CaregiverDashboard />;
    case 'patient':
    default:
      return <PatientDashboard isDoctorView={false} />;
  }
}
