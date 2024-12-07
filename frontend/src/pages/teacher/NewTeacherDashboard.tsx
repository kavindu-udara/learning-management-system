import OverviewCard from "@/components/cards/OverviewCard";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BarChartComponent from "@/components/charts/BarChartComponent";
import PieChartComponent from "@/components/charts/PieChartComponent";
import { ScrollArea } from "@/components/ui/scroll-area";
import RecentSalesCard from "@/components/cards/RecentSalesCard";

const NewTeacherDashboard: React.FC = () => {
  return (
    <div className="m-5 h-screen">
      <div className="grid grid-cols-3 h-full gap-5">
        <div className="col-span-2 flex flex-col">
          <div className="flex flex-wrap gap-5 border-b py-3">
            <OverviewCard title="Courses" count={10} />
            <OverviewCard title="Earnings" count={1000} />
            <OverviewCard title="Students" count={100} />
          </div>
          <div className="border-b">
            <div className="text-2xl text-dark-acent-color font-jua mt-5">
              User in The Last Week
            </div>
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="row-span-2">
            <div className="text-2xl text-dark-acent-color font-jua mt-5">
              User in The Last Week
            </div>
            <BarChartComponent />
          </div>
        </div>
        <div className="grid grid-rows-3 gap-3">
          <div>
            <PieChartComponent />
          </div>
          <div className="row-span-2">
            <div className="flex flex-wrap justify-between mb-3 text-xl text-dark-acent-color mt-5">
              <div className=" font-jua">Recent Sales</div>
              <div className=" font-jua underline">See All</div>
            </div>
            <div>
              <ScrollArea className="h-[450px] w-full rounded-md border p-4 flex flex-col gap-3">
                <RecentSalesCard />
                <RecentSalesCard />
                <RecentSalesCard />
                <RecentSalesCard />
                <RecentSalesCard />
                <RecentSalesCard />
                <RecentSalesCard />
                <RecentSalesCard />
                <RecentSalesCard />
                <RecentSalesCard />
                <RecentSalesCard />
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTeacherDashboard;
