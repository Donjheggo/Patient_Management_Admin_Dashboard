import SearchBar from "@/components/search-bar";
import DoctorsTable from "@/components/doctors/table";
import CreateDoctorDialog from "@/components/doctors/create-dialog";

export default function Doctors({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  return (
    <div className="container max-w-screen-lg mx-auto p-4 lg:p-6">
      <h1 className="text-center text-2xl">Doctors</h1>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <SearchBar />
          <CreateDoctorDialog />
        </div>
        <div className="mt-2">
          <DoctorsTable searchQuery={searchQuery} page={page} />
        </div>
      </div>
    </div>
  );
}
