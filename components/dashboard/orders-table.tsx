import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GetOrders } from "@/lib/actions/orders";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MoveUpRight } from "lucide-react";
import ItemsDialog from "../orders/items-dialog";
import Link from "next/link";

export default async function OrdersTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [orders] = await Promise.all([
    GetOrders(searchQuery, page, items_per_page),
  ]);

  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Orders</CardTitle>
          <Link href="/orders">
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
              <TableHead className="table-cell">Items</TableHead>
              <TableHead className="table-cell">Email</TableHead>
              <TableHead className="table-cell">Name</TableHead>
              <TableHead className="table-cell">Contact no.</TableHead>
              <TableHead className="table-cell">Address</TableHead>
              <TableHead className="table-cell">Payment Method</TableHead>
              <TableHead className="table-cell">Gcash Ref no.</TableHead>
              <TableHead className="table-cell">Delivery Status</TableHead>
              <TableHead className="table-cell">Delivery Schedule</TableHead>
              <TableHead className="table-cell">Total Price</TableHead>
              <TableHead className="table-cell">Total Shipping</TableHead>
              <TableHead className="table-cell">Total Payable</TableHead>
              <TableHead className="table-cell">Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-normal">
                  <ItemsDialog order_id={item.id} />
                </TableCell>
                <TableCell className="font-normal">
                  {item.user_id.email}
                </TableCell>
                <TableCell className="font-normal">{item.name}</TableCell>
                <TableCell className="font-normal">
                  {item.contact_number}
                </TableCell>
                <TableCell className="font-normal">{item.address}</TableCell>
                <TableCell className="font-normal">
                  {item.payment_method}
                </TableCell>
                <TableCell className="font-normal">
                  {item.gcash_reference_number}
                </TableCell>
                <TableCell className="font-normal">
                  <Badge>{item.delivery_status}</Badge>
                </TableCell>
                <TableCell className="font-normal">
                  {item.delivery_schedule &&
                    new Date(item.delivery_schedule).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-normal">
                  ₱{item.total_price}
                </TableCell>
                <TableCell className="font-normal text-center">
                  ₱{item.total_shipping_fee}
                </TableCell>
                <TableCell className="font-semibold text-lg">
                  ₱{item.total_payable}
                </TableCell>

                <TableCell className="font-normal">
                  {new Date(item.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
