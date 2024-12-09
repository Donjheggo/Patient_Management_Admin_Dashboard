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
  DropdownMenuSeparator,
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
import {
  GetAppointments,
  GetTotalAppointment,
} from "@/lib/actions/appointments";
import { TablePagination } from "./pagination";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import UpdateButton from "./update-button";
import DeleteButton from "./delete-button";

export default async function AppointmentsTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [totalAppointments, appointments] = await Promise.all([
    GetTotalAppointment(),
    GetAppointments(searchQuery, page, items_per_page),
  ]);

  const totalPages = Math.ceil(totalAppointments / items_per_page);
  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <CardTitle>Appointments</CardTitle>
        <CardDescription>Manage appointments.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="table-cell">Patient</TableHead>
              <TableHead className="table-cell">Reason</TableHead>
              <TableHead className="table-cell">Doctor</TableHead>
              <TableHead className="table-cell">Start time</TableHead>
              <TableHead className="table-cell">End time</TableHead>
              <TableHead className="table-cell">Remarks</TableHead>
              <TableHead className="table-cell">Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments?.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <p className="font-normal">{item.patient_id.name}</p>
                </TableCell>

                <TableCell>
                  <p className="font-normal">{item.reason}</p>
                </TableCell>

                <TableCell>
                  <p className="font-normal">{item.doctor_id.name}</p>
                </TableCell>

                <TableCell>
                  <p className="font-normal">
                    {new Date(item.schedule_id.start_time).toLocaleTimeString()}{" "}
                    -{" "}
                    {new Date(item.schedule_id.start_time).toLocaleDateString()}
                  </p>
                </TableCell>

                <TableCell>
                  <p className="font-normal">
                    {new Date(item.schedule_id.end_time).toLocaleTimeString()} -{" "}
                    {new Date(item.schedule_id.end_time).toLocaleDateString()}
                  </p>
                </TableCell>
                <TableCell>{item.remarks}</TableCell>
                <TableCell>
                  {item.status === "PENDING" ? (
                    <Badge variant="outline">Pending</Badge>
                  ) : item.status === "ACCEPTED" ? (
                    <Badge>Accepted</Badge>
                  ) : (
                    <Badge>Completed</Badge>
                  )}
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
                        <UpdateButton id={item.id} />
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
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
          <strong>{Math.min(page * items_per_page, totalAppointments)}</strong>{" "}
          of <strong>{totalAppointments}</strong>
        </div>
        <div className="ml-auto">
          <TablePagination totalPages={totalPages} />
        </div>
      </CardFooter>
    </Card>
  );
}
