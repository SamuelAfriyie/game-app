"use client";
import ListTile from "@/components/common/list_tile";
import { PageTitle } from "@/components/common/page_title";
import StatisticsCard from "@/components/common/sattistics_card";
import { Card } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { FaUserCheck } from "react-icons/fa6";
import { SiCampaignmonitor } from "react-icons/si";
import { GiSandsOfTime } from "react-icons/gi";
import BarChart from "../../../components/common/chart";
import { DropDownX } from "@/components/common/input";
import { UseGetEventWithNamesOnly } from "@/hooks/common/use_event";
import { UseRanking } from "@/hooks/common/use_statistics";
import { sortRankingByScore } from "@/utils/func/sorting";
import Spinner from "@/components/common/spinner";

const statsData = [
  {
    title: "Number of users",
    value: 5294,
    icon: (
      <FaUsers
        className="text-4xl items-cente"
        style={{
          color: "#0058A9",
        }}
      />
    ),
    stats: 12,
  },
  {
    title: "Active Users",
    value: 654,
    icon: (
      <FaUserCheck
        className="text-4xl items-cente"
        style={{
          color: "#0058A9",
        }}
      />
    ),
    stats: 24,
  },
  {
    title: "Campaigns Played",
    value: 342,
    icon: (
      <SiCampaignmonitor
        className="text-4xl items-cente"
        style={{
          color: "#0058A9",
        }}
      />
    ),
    stats: 1,
  },
  {
    title: "Completion Rate",
    value: 135,
    icon: (
      <GiSandsOfTime
        className="text-4xl items-cente"
        style={{
          color: "#0058A9",
        }}
      />
    ),
    stats: 9,
  },
];

export default function Overview() {
  const { eventNames } = UseGetEventWithNamesOnly();
  const [eventID, setEventID] = useState<string>("");
  const { data, isLoading } = UseRanking(eventID);
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

  const handleRanking = (value: string) => {
    setEventID(value);
  };

  const getRanking = () => {
    const sortedData = sortRankingByScore(data);

    return sortedData.map((r: any, i: number) => {
      return (
        <ListTile
          key={i}
          avatar={"/static/photos/user.webp"}
          username={r.username}
          email={r.email}
          score={
            r.eventResults?.length > 0
              ? r.eventResults[r.eventResults?.length - 1]?.score
              : 0
          }
        />
      );
    });
  };

  return (
    <>
      <div className="h-full w-full overflow-x-auto xll:overflow-hidden">
        <PageTitle title={"Overview"} />
        <main className="flex flex-col h-full w-full space-y-3 ">
          <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4  w-full ">
            {arr.map((e, i) => (
              <span key={i}>{e}</span>
            ))}
          </section>
          {/* <div className="flex space-x-5 w-full h-[70%] bg-red-500">
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
            <Card className="flex-1 shadow-md overflow-hidden h-full">
              <div className="w-full flex justify-between mb-2">
                <PageTitle title={"Applicant Ranking"} />
                <div>
                  <DropDownX
                    options={eventNames ?? []}
                    style={{ width: 140, height: 30 }}
                    placeholder="Filter By Event"
                    handleChange={handleRanking}
                  />
                </div>
              </div>
              <div className="flex flex-col overflow-y-auto h-96 w-full">
                {isLoading ? <Spinner /> : getRanking()}
              </div>
            </Card>
          </div> */}
          <div className="grid grid-cols-1 lg:grid-cols-3 space-y-2 lg:space-y-0 lg:space-x-3 w-full h-auto">
            <Card className="lg:col-span-2 shadow-md w-full items-center">
              <PageTitle title={"Summary"} />
              <BarChart />
              <div className="flex justify-center items-center">
                <p>Win</p>
                <div className="p-2 m-3 bg-blue-800"></div>
                <p>Loss</p>
                <div className="p-2 m-3 bg-gray-500"></div>
              </div>
            </Card>
            <Card className="shadow-md overflow-hidden h-full ">
              <div className="w-full flex justify-between mb-2">
                <PageTitle title={"Applicant Ranking"} />
                <div>
                  <DropDownX
                    options={eventNames ?? []}
                    style={{ width: 140, height: 30 }}
                    placeholder="Filter By Event"
                    handleChange={handleRanking}
                  />
                </div>
              </div>
              <div className="flex flex-col overflow-y-auto h-96 w-full">
                {isLoading ? <Spinner /> : getRanking()}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}
