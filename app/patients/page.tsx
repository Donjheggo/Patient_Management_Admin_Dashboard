import SearchBar from "@/components/search-bar";
import PatientsTable from "@/components/patients/table";

export default function Patients({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const searchQuery = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;

  return (
    <div className="container max-w-screen-lg mx-auto p-4 lg:p-6">
      <h1 className="text-center text-2xl">Patients</h1>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <SearchBar />
        </div>
        <div className="mt-2">
          <PatientsTable searchQuery={searchQuery} page={page} />
        </div>
      </div>
    </div>
  );
}
