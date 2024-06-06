import React from "react";
import type { TableColumnsType } from "antd";
import { Table } from "antd";
import {
  EventResultsType,
  gameResultsEventColumns,
} from "@/utils/data/game_results_data";
 

interface ExpandedDataType {
  key: React.Key;
  attempt: string;
  level: string;
  score: string;
}
 
 interface Props {
  data: EventResultsType[];
}

export const ExpandableTable = ({ data }: Props) => {
  const expandedRowRender = (record: any) => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: "Attempt", dataIndex: "attempt", key: "attempt" },
      { title: "Level", dataIndex: "level", key: "level" },
      {
        title: "Score",
        dataIndex: "score",
        key: "score",
      },
      {title: "Date", dataIndex: "date", key: "date"}
    ];

    const data = record.attempts.map((eventResult: any, i: number) => { 
      return {
        key: i,
        attempt: `${1 + i}`,
        level: eventResult.level,
        score: eventResult.score,
        date: eventResult?.date?.split("T")[0],
      };
    });

    return (
      <Table columns={columns} dataSource={data} pagination={false} bordered />
    );
  };

  return (
    <>
      <div style={{ maxHeight: 550, overflow: "auto" }}>
        <Table
          columns={gameResultsEventColumns}
          expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
          dataSource={data}
          size="small"
        />
      </div>
    </>
  );
};
