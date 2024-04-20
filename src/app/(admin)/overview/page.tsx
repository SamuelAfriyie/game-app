import ListTile from "@/components/common/list_tile";
import { PageTitle } from "@/components/common/page_title";
import StatisticsCard from "@/components/common/sattistics_card";
import { Card } from "antd";
import { ReactNode } from "react";

export default function Dashboard() {
  const arr = Array<ReactNode>(4).fill(
    <StatisticsCard title={"Number of users"} value={0} />
  );

  const arrCards = Array<ReactNode>(6).fill(
    <ListTile
      avatar={"https://placebear.com/g/200/200"}
      username={"Hello World"}
      email={"sam@gmail.com"}
      score={0}
    />
  );
  return (
    <>
      <PageTitle title={"Overview"} />
      <main className="h-full w-full">
        <section className="grid grid-cols-4 gap-4 h-[20%] w-full">
          {arr.map((e) => e)}
        </section>
        <div className="flex space-x-5 mt-5 h-[70%] w-full">
          <Card className="flex-auto shadow-md w-1/3 items-center">
            <PageTitle title={"Summary"} />
            <div className="h-96 bg-gray-500"></div>
            <div className="flex justify-center items-center">
              <div className="p-2 m-3 bg-gray-500"></div>
              <p>Win</p>
              <div className="p-2 m-3 bg-gray-500"></div>
              <p>Looses</p>
            </div>
          </Card>
          <Card className="flex-1 shadow-md overflow-y-auto">
            <PageTitle title={"User Ranking"} />
            <div className="flex flex-col">{arrCards.map((e) => e)}</div>
          </Card>
        </div>
      </main>
    </>
  );
}
