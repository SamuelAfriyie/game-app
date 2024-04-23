"use client";

import GTable from "@/components/common/general_table";
import { PageTitle } from "@/components/common/page_title";
import gamesData, { gamesColumns } from "@/utils/data/games_data";
import { Card, Input, Space } from "antd";
import { ReactNode } from "react";

const setTitle = (): ReactNode => {
  return (
    <div className="flex justify-end">
      <div className="space-x-3 my-2">
        <Input placeholder="Filter" style={{ width: 400 }} className="h-10" />
      </div>
    </div>
  );
};
export default function Games() {
  return (
    <>
      <Space direction="vertical" size="small" style={{ display: "flex" }}>
        <PageTitle title="Games" />
        <div className="w-[70%]">
          <Card
            title={setTitle()}
            type="inner"
            size="small"
            loading={false}
            style={{ minHeight: 650 }}
          >
            <GTable
              columns={gamesColumns}
              dataSource={gamesData}
              bordered
              scroll={{ x: 0, y: 500 }}
            />
          </Card>
        </div>
      </Space>
    </>
  );
}
