import OverviewCard from "@/components/cards/OverviewCard";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BarChartComponent from "@/components/charts/BarChartComponent";
import PieChartComponent from "@/components/charts/PieChartComponent";

const NewTeacherDashboard: React.FC = () => {
  return (
    <div className="m-5 h-screen">
      <div className="grid grid-cols-3 h-full gap-5">
        <div className="col-span-2 grid grid-rows-5">
          <div className="flex flex-wrap gap-5 ">
            <OverviewCard title="Courses" count={10} />
            <OverviewCard title="Courses" count={10} />
            <OverviewCard title="Courses" count={10} />
          </div>
          <div className="row-span-2">
            <div>User in The Last Week</div>
            <div>
              <BarChartComponent />
            </div>
          </div>
          <div className="row-span-2">
            <div>User in The Last Week</div>
            <div>
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
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
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <div className=" grid grid-rows-3">
          <div>
            <PieChartComponent />
          </div>
          <div className="row-span-2 p-5">
            <div className="flex flex-wrap justify-between">
              <div>Recent Sales</div>
              <div>See All</div>
            </div>
            <div>
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
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
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTeacherDashboard;
