"use client";
import { FilledButton, IconButton } from "@/components/common/buttons";
import DefaultModal from "@/components/common/default_modal";
import { ExpandableTable } from "@/components/common/expandable_table";
import { PageTitle } from "@/components/common/page_title";
import Spinner from "@/components/common/spinner";
import { UseGetEventResults } from "@/hooks/common/use_results";
import { ExportConfig } from "@/utils/data/file_export_config";
import { gameResultsColumns } from "@/utils/data/game_results_data";
import { Input } from "antd";
import Space from "antd/es/space";
import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { BiSolidFileExport } from "react-icons/bi";

const DynamicTable = dynamic(() => import("@/components/common/general_table"));

export default function Result() {
  const [open, setOpen] = useState<boolean>(false);
  const [filteredResults, setFilteredResults] = useState<any>(undefined);
  const { data, isLoading } = UseGetEventResults();
  const selectedEvent = useRef<any>([]);

  const handleBtnClicked = (key: number) => {
    selectedEvent.current = data[key]?.eventResults.map(
      (event: any, index: number) => {
        return {
          key: index,
          event: event.eventName,
          attempts: event.attempts,
          attemptCount: event.attemptCount,
          level: event.level,
          date: event.date.split("T")[0],
          score: event.score >= event.passScore ? "Win" : "Loss",
        };
      }
    );
    setOpen(true);
  };

  const appendKeyAndBtn = (data: any) => {
    return data?.map(
      ({ username, email, eventResults }: any, index: number) => {
        return {
          username: username,
          email: email,
          event: eventResults[eventResults.length - 1].eventName,
          attempts: eventResults[eventResults.length - 1].attemptCount,
          level: eventResults[eventResults.length - 1].level,
          score: eventResults[eventResults.length - 1].score,
          date: eventResults[eventResults.length - 1].date.split("T")[0],
          status:
            eventResults[eventResults.length - 1].score >=
            eventResults[eventResults.length - 1].passScore
              ? "Win"
              : "Loss",
          key: index,
          action: <IconButton onClick={() => handleBtnClicked(index)} />,
        };
      }
    );
  };

  const handleFilter = (e: any) => {
    console.log(data);
    const value = e.target.value;
    const filteredList = data.filter((item: any) => {
      return (
        item.username.toLowerCase().includes(value.toLowerCase()) ||
        item.email.toLowerCase().includes(value.toLowerCase())
      );
      // ||
      // item.eventResults[data.length - 1].eventName
      //   .toLowerCase()
      //   .includes(value.toLowerCase()) ||
      // item.eventResults[data.length - 1].level
      //   .toLowerCase()
      //   .includes(value.toLowerCase()) ||
      // item.eventResults[data.length - 1].score
      //   .toLowerCase()
      //   .includes(value.toLowerCase()) ||
      // item.eventResults[data.length - 1].date
      //   .toLowerCase()
      //   .includes(value.toLowerCase()) ||
      // item.eventResults[data.length - 1].score >=
      //   item.eventResults[data.length - 1].passScore
      // ? "Win"
      // : "Loss".toLowerCase().includes(value.toLowerCase()) ||
      //     item.eventResults[data.length - 1].attemptCount
      //       .toString()
      //       .includes(value);
    });
    setFilteredResults(filteredList);
  };

  return (
    <>
      <DefaultModal
        open={open}
        setOpen={setOpen}
        width={1000}
        content={<ExpandableTable data={selectedEvent.current} />}
        title={"View Results"}
        showFooter={false}
      />
      <Space direction="vertical" size="small" style={{ display: "flex" }}>
        <header className="flex justify-between mb-3">
          <PageTitle title="Game Results" />
          <div className="flex space-x-2 items-center">
            <Input
              placeholder="Filter"
              style={{ width: 400 }}
              onChange={handleFilter}
            />
            <FilledButton
              icon={<BiSolidFileExport size={13} />}
              text="Export CSV"
              onClick={() => {
                if (data.length > 0) {
                  console.log(data, "data");
                  ExportConfig.init = data.map((item: any) => {
                    return {
                      Username: item.username,
                      Email: item.email,
                      Event:
                        item.eventResults[item.eventResults.length - 1]
                          .eventName,
                      Attempts:
                        item.eventResults[item.eventResults.length - 1]
                          .attemptCount,
                      Level:
                        item.eventResults[item.eventResults.length - 1].level,
                      Score:
                        item.eventResults[item.eventResults.length - 1].score,
                      Date: item.eventResults[
                        item.eventResults.length - 1
                      ].date.split("T")[0],
                      Status:
                        item.eventResults[item.eventResults.length - 1].score >=
                        item.eventResults[item.eventResults.length - 1]
                          .passScore
                          ? "Win"
                          : "Loss",
                    };
                  });
                  ExportConfig.exportToCSV();
                }
              }}
            />
          </div>
        </header>
        {isLoading ? (
          <div className="flex justify-center items-center w-full">
            <Spinner />
          </div>
        ) : (
          <DynamicTable
            columns={gameResultsColumns}
            dataSource={
              appendKeyAndBtn(filteredResults) ?? appendKeyAndBtn(data)
            }
            bordered
            scroll={{ x: 0, y: 500 }}
          />
        )}
      </Space>
    </>
  );
}
