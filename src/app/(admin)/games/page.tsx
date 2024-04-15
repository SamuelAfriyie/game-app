"use client";

import GTable from "@/components/common/general_table";
import { testColumns, testData } from "@/utils/test/datagrid_test_data";
import { Space } from "antd";

export default function Games() {
  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Space />
        <section className="h-[50%] mt-10">
          <GTable columns={testColumns} dataSource={testData} bordered />
        </section>
      </Space>
    </>
  );
}
