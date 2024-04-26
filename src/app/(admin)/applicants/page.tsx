"use client";
import { PageTitle } from "@/components/common/page_title";
import { UseApplicants } from "@/hooks/common/use_applicants";
import { usersColumns } from "@/utils/data/users_data";
import { Space } from "antd";
import dynamic from "next/dynamic";

const DynamicTable = dynamic(() => import("@/components/common/general_table"));

export default function Applicants() {
  const { data, isLoading, isError } = UseApplicants();
  return (
    <>
      <Space direction="vertical" size="small" style={{ display: "flex" }}>
        <PageTitle title="Applicants" />

        <DynamicTable
          columns={usersColumns}
          dataSource={data}
          loading={isLoading}
          bordered
          scroll={{ x: 0, y: 500 }}
        />
      </Space>
    </>
  );
}
