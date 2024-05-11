"use client";
import { IconButton } from "@/components/common/buttons";
import DefaultModal from "@/components/common/default_modal";
import { ExpandableTable } from "@/components/common/expandable_table";
import { PageTitle } from "@/components/common/page_title";
import Spinner from "@/components/common/spinner";
import { UseGetEventResults } from "@/hooks/common/use_results";
import gameResultsData, {
  gameResultsColumns,
} from "@/utils/data/game_results_data";
import { Input } from "antd";
import Space from "antd/es/space";
import dynamic from "next/dynamic";
import { useState } from "react";

const DynamicTable = dynamic(() => import("@/components/common/general_table"));

export default function Result() {
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading, isError } = UseGetEventResults();

  const handleBtnClicked = () => {
    setOpen(true);
  };

  const appendKeyAndBtn = () => {
    return data?.map(
      ({ username, email, eventResults }: any, index: number) => {
        return {
          username: username,
          email: email,
          event: eventResults[eventResults.length - 1].eventName,
          attempts: eventResults[eventResults.length - 1].attemptCount,
          level: eventResults[eventResults.length - 1].level,
          score: eventResults[eventResults.length - 1].score,
          status:
            eventResults[eventResults.length - 1].score >=
            eventResults[eventResults.length - 1].passScore
              ? "Win"
              : "Loss",
          key: index,
          action: <IconButton onClick={handleBtnClicked} />,
        };
      }
    );
  };

  return (
    <>
      <DefaultModal
        open={open}
        setOpen={setOpen}
        width={1000}
        content={<ExpandableTable />}
        title={"View Results"}
        showFooter={false}
      />
      <Space direction="vertical" size="small" style={{ display: "flex" }}>
        <header className="flex justify-between mb-3">
          <PageTitle title="Game Results" />
          <div className="flex space-x-2 items-center">
            <Input placeholder="Filter" style={{ width: 400 }} />
          </div>
        </header>
        {isLoading ? (
          <div className="flex justify-center items-center w-full">
            <Spinner />
          </div>
        ) : (
          <DynamicTable
            columns={gameResultsColumns}
            dataSource={appendKeyAndBtn()}
            bordered
            scroll={{ x: 0, y: 500 }}
          />
        )}
      </Space>
    </>
  );
}
