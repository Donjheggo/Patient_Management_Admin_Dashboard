import { ArrowLeft } from "lucide-react";
import { GetAppointmentById } from "@/lib/actions/appointments";
import Link from "next/link";
import UpdateAppointmentForm from "@/components/appointments/update-form";

export default async function UpdateAppointment({
  params,
}: {
  params: { id: string };
}) {
  const item = await GetAppointmentById(params.id);

  return (
    <div className="p-4 lg:p-6">
      <Link href="../" className="flex gap-2 hover:underline">
        <ArrowLeft />
        Back
      </Link>
      <h1 className="text-center text-2xl">Update</h1>
      <div className="mt-5">
        <UpdateAppointmentForm item={item} />
      </div>
    </div>
  );
}
