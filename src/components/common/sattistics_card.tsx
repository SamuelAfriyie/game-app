"use client";
import { Card } from "antd";
import React from "react";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { FaUsers } from "react-icons/fa";

interface StatisticsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  stats: number;
}

// const StatisticsCard: React.FC<StatisticsCardProps> = ({ title, value }) => {
//     return (
//         <Card bordered={false} className='w-full'>
//         <Statistic
//           title="Active"
//           value={11.28}
//           precision={2}
//           valueStyle={{ color: '#3f8600' }}
//           prefix={<ArrowUpIcon />}
//           suffix="%"
//         />
//       </Card>
//     );
// };

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  value = 0,
  icon,
  stats = 0,
}) => {
  return (
    <div  className="rounded-sm shadow-md p-7 bg-gray-100">
      <div className="w-full flex justify-between ">
        <aside>
          <p className="font-medium">{title}</p>
          <h2 className="text-3xl font-semibold my-4">{value}</h2>
        </aside>
        <aside className="flex-none ">
          {/* <FaUsers className="text-4xl items-center text-green-600" /> */}
          {icon}
        </aside>
      </div>
      <p className={`${stats > 0 ? "text-green-500" : "text-red-500"}`}>
        {stats}% from last week
      </p>
    </div>
  );
};

export default StatisticsCard;
