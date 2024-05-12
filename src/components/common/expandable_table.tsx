import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Badge, Dropdown, Space, Table } from "antd";
import campaignData, {
  campaignColumns,
  gameResultsCampaignColumns,
} from "@/utils/data/campaign_data";
import {
  EventResultsType,
  gameResultsEventColumns,
} from "@/utils/data/game_results_data";

interface DataType {
  key: React.Key;
  name: string;
  level: string;
  score: string;
}

interface ExpandedDataType {
  key: React.Key;
  attempt: string;
  level: string;
  score: string;
}

const items = [
  { key: "1", label: "Action 1" },
  { key: "2", label: "Action 2" },
];

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
    ];

    const data = record.attempts.map((eventResult: any, i: number) => {
      return {
        key: i,
        attempt: `${1 + i}`,
        level: eventResult.level,
        score: eventResult.score,
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
