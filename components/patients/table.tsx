import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetPatients, GetTotalPatients } from "@/lib/actions/patients";
import { TablePagination } from "./pagination";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import DeleteButton from "./delete-button";

export default async function PatientsTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [totalPatients, patients] = await Promise.all([
    GetTotalPatients(),
    GetPatients(searchQuery, page, items_per_page),
  ]);

  const totalPages = Math.ceil(totalPatients / items_per_page);
  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <CardTitle>Patients</CardTitle>
        <CardDescription>Manage patients.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="table-cell">Email</TableHead>
              <TableHead className="table-cell">Name</TableHead>
              <TableHead className="table-cell">Gender</TableHead>
              <TableHead className="table-cell">Address</TableHead>
              <TableHead className="table-cell">Birthdate</TableHead>
              <TableHead className="table-cell">Contact no.</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <p className="font-normal">{item.user_id.email}</p>
                </TableCell>
                <TableCell>
                  <p className="font-normal">{item.name}</p>
                </TableCell>
                <TableCell>
                  <p className="font-normal">{item.gender}</p>
                </TableCell>
                <TableCell>
                  <p className="font-normal">{item.address}</p>
                </TableCell>
                <TableCell>
                  <p className="font-normal">{item.birthdate}</p>
                </TableCell>
                <TableCell>
                  <p className="font-normal">{item.contact_number}</p>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <DeleteButton id={item.id} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          <strong>{(page - 1) * items_per_page + 1}</strong>-
          <strong>{Math.min(page * items_per_page, totalPatients)}</strong> of{" "}
          <strong>{totalPatients}</strong>
        </div>
        <div className="ml-auto">
          <TablePagination totalPages={totalPages} />
        </div>
      </CardFooter>
    </Card>
  );
}
