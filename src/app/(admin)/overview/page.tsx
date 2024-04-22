"use client";
import ListTile from "@/components/common/list_tile";
import { PageTitle } from "@/components/common/page_title";
import StatisticsCard from "@/components/common/sattistics_card";
import { Card } from "antd";
import { ReactNode } from "react";
import { FaUsers } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { SiCampaignmonitor } from "react-icons/si";
import { GiSandsOfTime } from "react-icons/gi";
import BarChart from "../../../components/common/chart";

const statsData = [
  {
    title: "Number of users",
    value: 5294,
    icon: <FaUsers className="text-4xl items-cente" style={{
      color: "#0058A9",
    }} />,
    stats: 12,
  },
  {
    title: "Active Users",
    value: 654,
    icon: <FaUserCheck className="text-4xl items-cente" style={{
      color: "#0058A9",
    }}/>,
    stats: 24,
  },
  {
    title: "Campaigns Played",
    value: 342,
    icon: (
      <SiCampaignmonitor className="text-4xl items-cente" style={{
        color: "#0058A9",
      }}/>
    ),
    stats: 1,
  },
  {
    title: "Completion Rate",
    value: 135,
    icon: <GiSandsOfTime className="text-4xl items-cente" style={{
      color: "#0058A9",
    }}/>,
    stats: 9,
  },
];

export default function Overview() {
  const arr = statsData.map((d, i) => {
    return (
      <StatisticsCard
        key={i}
        title={d.title}
        value={d.value}
        icon={d.icon}
        stats={d.stats}
      />
    );
  });

  const arrCards = Array<ReactNode>(6).fill(
    <ListTile 
      avatar={"/static/photos/user.webp"}
      // avatar={"https://themusclemedics.com/wp-content/uploads/2018/04/Circle-Profile-PNG.png"}
      username={"John Doe"}
      email={"john@gmail.com"}
      score={120}
    />
  );
  return (
    <>
      <div className="h-full w-full">
        <PageTitle title={"Overview"} />
        <main className="flex flex-col h-full w-full space-y-3 ">
          <section className="grid grid-cols-4 gap-4  w-full ">
            {arr.map((e, i) => (
              <span key={i}>{e}</span>
            ))}
          </section>
          <div className="flex space-x-5 w-full h-[70%]">
            <Card className="flex-auto shadow-md w-1/3 items-center">
              <PageTitle title={"Summary"} />
                <BarChart />
              <div className="flex justify-center items-center">
                <p>Win</p>
                <div className="p-2 m-3 bg-blue-800"></div>
                <p>Loss</p>
                <div className="p-2 m-3 bg-gray-500"></div>
              </div>
            </Card>
            <Card className="flex-1 shadow-md overflow-y-auto">
              <PageTitle title={"User Ranking"} />
              <div className="flex flex-col">{arrCards.map((e) => e)}</div>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
