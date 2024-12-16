import OverviewCard from "@/components/cards/OverviewCard";
import React, { useEffect, useState } from "react";
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
import apiClient from "@/axios/axios";
import { toast } from "react-toastify";

interface Data {
  courses?: any;
  salesHistory?: any;
  earnings: any;
}

const NewTeacherDashboard: React.FC = () => {
  const [data, setData] = useState<Data>({
    courses: [],
    salesHistory: [],
    earnings: 0,
  });

  const loadOverviewData = () => {
    apiClient
      .get("/teacher/overview")
      .then((res) => {
        // TODO : update chart
        setData(res.data);
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  useEffect(() => {
    loadOverviewData();
  }, []);

  return (
    <div className="m-5 h-screen">
      <div className="grid grid-cols-3 h-full gap-5">
        <div className="col-span-2 flex flex-col">
          <div className="flex flex-wrap gap-5 border-b py-3">
            <OverviewCard title="Courses" count={data?.courses?.length} />
            <OverviewCard title="Earnings" count={data?.earnings} />
            <OverviewCard title="Students" count={data?.salesHistory?.length} />
          </div>
          <div className="row-span-2">
            <div className="text-2xl text-dark-acent-color font-jua mt-5">
              User in The Last Week
            </div>
            <BarChartComponent />
          </div>
          <div className="border-b">
            <div className="text-2xl text-dark-acent-color font-jua mt-5">
              Recent Payments
            </div>
            <div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.salesHistory?.map((history: any) => (
                    <TableRow>
                      <TableCell className="font-medium">
                        {history._id}
                      </TableCell>
                      <TableCell>{history?.course?.title}</TableCell>
                      <TableCell>Credit Card</TableCell>
                      <TableCell className="text-right">
                        ${history.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
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
                {data?.salesHistory?.map((history: any) => (
                  <RecentSalesCard
                    profileImage={history?.user?.imageUrl}
                    userName={history?.user?.fname + " " + history?.user?.lname}
                    courseName={history?.course?.title}
                  />
                ))}
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTeacherDashboard;
