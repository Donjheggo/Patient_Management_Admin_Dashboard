import {
  BriefcaseMedical,
  ClipboardPlus,
  CalendarClock,
  CalendarCheck,
} from "lucide-react";
import DashboardCard from "@/components/dashboard/dashboard-card";
import AppointmentsTable from "@/components/dashboard/appointments-table";
import { GetTotalAppointment } from "@/lib/actions/appointments";
import { GetTotalDoctors } from "@/lib/actions/doctors";
import { GetTotalSchedules } from "@/lib/actions/schedules";
import { GetTotalPatients } from "@/lib/actions/patients";

export default async function Dashboard() {
  const [appointments, doctors, schedules, patients] = await Promise.all([
    GetTotalAppointment(),
    GetTotalDoctors(),
    GetTotalSchedules(),
    GetTotalPatients(),
  ]);

  const cards = [
    {
      title: "Total Patients",
      number: patients,
      icon: <ClipboardPlus size={25} className="text-primary" />,
    },
    {
      title: "Total Doctors",
      number: doctors,
      icon: <BriefcaseMedical size={25} className="text-primary" />,
    },
    {
      title: "Total Schedules",
      number: schedules,
      icon: <CalendarClock size={25} className="text-primary" />,
    },
    {
      title: "Total Appointments",
      number: appointments,
      icon: <CalendarCheck size={25} className="text-primary" />,
    },
  ];

  return (
    <div className="container mx-auto max-w-screen-2xl p-4 lg:p-6">
      <h1 className="text-center text-2xl">Dashboard</h1>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-2 xl:grid-cols-4 mt-4">
        {cards.map((item, index) => (
          <DashboardCard key={index} item={item} />
        ))}
      </div>
      <div className="flex flex-1 flex-col lg:flex-row gap-4 mt-4">
        <div className="w-full">
          <AppointmentsTable searchQuery="" page={1} />
        </div>
      </div>
    </div>
  );
}
