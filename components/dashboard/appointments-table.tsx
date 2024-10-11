import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetAppointments } from "@/lib/actions/appointments";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button } from "../ui/button";
import { MoveUpRight } from "lucide-react";

export default async function AppointmentsTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [appointments] = await Promise.all([
    GetAppointments(searchQuery, page, items_per_page),
  ]);

  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Appointments</CardTitle>
          <Link href="/appointments">
            <Button variant="outline" className="flex items-center">
              View More
              <MoveUpRight size={18} className="ml-1" />
            </Button>
          </Link>
        </div>
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

                <TableCell>
                  {item.status === "PENDING" ? (
                    <Badge variant="outline">Pending</Badge>
                  ) : item.status === "ACCEPTED" ? (
                    <Badge>Accepted</Badge>
                  ) : (
                    <Badge>Completed</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
