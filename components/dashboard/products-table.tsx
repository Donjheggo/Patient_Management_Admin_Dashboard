import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetProducts } from "@/lib/actions/products";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { MoveUpRight } from "lucide-react";

export default async function ProductsTable({
  searchQuery,
  page,
}: {
  searchQuery: string;
  page: number;
}) {
  const items_per_page = 7;

  const [products] = await Promise.all([
    GetProducts(searchQuery, page, items_per_page),
  ]);

  return (
    <Card className="w-full shadow-none bg-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Products</CardTitle>
          <Link href="/products">
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
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead className="table-cell">Name</TableHead>
              <TableHead className="table-cell">Description</TableHead>
              <TableHead className="table-cell">Quantity</TableHead>
              <TableHead className="table-cell">Price</TableHead>
              <TableHead className="table-cell">Shipping fee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="hidden sm:table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={item.image}
                    width="64"
                  />
                </TableCell>
                <TableCell>
                  <p className="font-normal">{item.name}</p>
                </TableCell>
                <TableCell>
                  <p className="font-normal">{item.description}</p>
                </TableCell>

                <TableCell>
                  <p className="font-normal">{item.quantity}</p>
                </TableCell>
                <TableCell>
                  <p className="font-normal">₱{item.price}</p>
                </TableCell>
                <TableCell>
                  <p className="font-normal">₱{item.shipping_fee}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
