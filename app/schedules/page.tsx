import SearchBar from "@/components/search-bar";
import SchedulesTable from "@/components/schedules/table";
import CreateScheduleDialog from "@/components/schedules/create-dialog";

export default function Schedules({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  return (
    <div className="container max-w-screen-lg mx-auto p-4 lg:p-6">
      <h1 className="text-center text-2xl">Doctor Schedules</h1>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <SearchBar />
          <CreateScheduleDialog />
        </div>
        <div className="mt-2">
          <SchedulesTable searchQuery={searchQuery} page={page} />
        </div>
      </div>
    </div>
  );
}
