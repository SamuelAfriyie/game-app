"use client";

import GTable from "@/components/common/general_table";
import { PageTitle } from "@/components/common/page_title";
import gamesData, { gamesColumns } from "@/utils/data/games_data";
import { Space } from "antd";

export default function Games() {
  return (
    <>
      <Space direction="vertical" size="small" style={{ display: "flex" }}> 
        <PageTitle title="Games" />
        <GTable
          columns={gamesColumns}
          dataSource={gamesData}
          bordered
          scroll={{ x: 0, y: 500 }}
        />
      </Space>
    </>
  );
}
