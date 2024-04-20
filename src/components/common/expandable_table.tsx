import React from "react";
import { DownOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import { Badge, Dropdown, Space, Table } from "antd";
import campaignData, { campaignColumns } from "@/utils/data/campaign_data";

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

export const ExpandableTable = () => {
  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
      { title: "Attempt", dataIndex: "attempt", key: "attempt" },
      { title: "Level", dataIndex: "level", key: "level" },
      {
        title: "Score",
        dataIndex: "score",
        key: "score",
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        attempt: `${1 + i}`,
        level: `Level ${1 + i}`,
        score: "120",
      });
    }
    return (
      <Table columns={columns} dataSource={data} pagination={false} bordered />
    );
  };

  const columns: TableColumnsType<DataType> = [
    { title: "Campaign", dataIndex: "name", key: "name" },
    { title: "Level", dataIndex: "level", key: "level" },
    { title: "Score", dataIndex: "score", key: "score" },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      name: `Campaign ${i}`,
      level: `${3 + i}`,
      score: "16",
    });
  }

  return (
    <>
      <div style={{ maxHeight: 550, overflow: "auto" }} >
        <Table
          columns={campaignColumns}
          expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
          dataSource={campaignData}
          size="small"
        />
      </div>
    </>
  );
};
