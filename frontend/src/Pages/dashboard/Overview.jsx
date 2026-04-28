import { useOutletContext } from 'react-router-dom';
import PatientDashboard from '../../roles/Patient';
import DoctorDashboard from '../../roles/Doctor';
import CaregiverDashboard from '../../roles/Caregiver';

export default function Overview() {
  const { user } = useOutletContext();

  if (user.role === 'Doctor') {
    return <DoctorDashboard />;
  }

  if (user.role === 'Caregiver') {
    return <CaregiverDashboard />;
  }

  // Default to Patient
  return <PatientDashboard />;
}
