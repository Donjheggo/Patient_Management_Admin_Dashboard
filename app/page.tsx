import DashboardCard from "@/components/dashboard/dashboard-card";
import { Armchair, ShoppingCart, Truck, Loader } from "lucide-react";
// import { GetTotalProducts } from "@/lib/actions/products";
// import {
//   GetPendingOrders,
//   GetDeliveryOrders,
//   GetCompletedOrders,
// } from "@/lib/actions/orders";
import OrdersTable from "@/components/dashboard/orders-table";

export default async function Dashboard() {
  // const [products, pending, delivery, completed] = await Promise.all([
  //   GetTotalProducts(),
  //   GetPendingOrders(),
  //   GetDeliveryOrders(),
  //   GetCompletedOrders(),
  // ]);

  const cards = [
    {
      title: "Total Products",
      number: 1,
      icon: <Armchair size={25} className="text-primary" />,
    },
    {
      title: "Pending Orders",
      number: 2,
      icon: <Loader size={25} className="text-primary" />,
    },
    {
      title: "Out For Delivery Orders",
      number: 3,
      icon: <Truck size={25} className="text-primary" />,
    },
    {
      title: "Total Orders",
      number: 4,
      icon: <ShoppingCart size={25} className="text-primary" />,
    },
  ];

  return (
    <div className="container mx-auto max-w-screen-2xl p-4 lg:p-6">
      <h1 className="text-center text-2xl">Dashboard</h1>
      <div className="grid gap-4 grid-cols-2 md:grid-cols-2 xl:grid-cols-4 mt-4">
        {cards.map((item, index) => (
          <DashboardCard key={index} item={item} />
        ))}
      </div>
      <div className="flex flex-1 flex-col lg:flex-row gap-4 mt-4">
        {/* <div className="w-full">
          <OrdersTable searchQuery="" page={1} />
        </div> */}
      </div>
    </div>
  );
}
