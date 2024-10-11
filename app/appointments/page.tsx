import SearchBar from "@/components/search-bar";
import AppointmentsTable from "@/components/appointments/table";

export default function Appointments({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  return (
    <div className="container max-w-screen-lg mx-auto p-4 lg:p-6">
      <h1 className="text-center text-2xl">Appointments</h1>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <SearchBar />
        </div>
        <div className="mt-2">
          <AppointmentsTable searchQuery={searchQuery} page={page} />
        </div>
      </div>
    </div>
  );
}
