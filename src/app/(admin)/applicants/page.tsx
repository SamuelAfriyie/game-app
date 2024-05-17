"use client";
import { FilledButton } from "@/components/common/buttons";
import { PageTitle } from "@/components/common/page_title";
import { UseApplicants } from "@/hooks/common/use_applicants";
import { ExportConfig } from "@/utils/data/file_export_config";
import { usersColumns } from "@/utils/data/users_data";
import { Input, Space } from "antd";
import dynamic from "next/dynamic";
import { ReactNode, useState } from "react";
import { BiSolidFileExport } from "react-icons/bi";

const DynamicTable = dynamic(() => import("@/components/common/general_table"));

export default function Applicants() {
  const { data, isLoading, isError } = UseApplicants();
  const [filteredData, setFilteredData] = useState<any>(undefined);

  const handleFilter = (e: any) => {
    const value = e.target.value.toLowerCase();
    const filteredData = data.filter((item: any) => {
      return (
        item.firstName.toLowerCase().includes(value) ||
        item.lastName.toLowerCase().includes(value) ||
        item.email.toLowerCase().includes(value)
      );
    });
    setFilteredData(filteredData);
  };

  return (
    <>
      <Space direction="vertical" size="small" style={{ display: "flex" }}>
        <div className="flex justify-between items-center">
          <PageTitle title="Applicants" />
          <div className="space-x-2 my-2">
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
                  ExportConfig.init = data.map((item: any) => {
                    return {
                      firstName: item.firstName,
                      lastName: item.lastName,
                      email: item.email,
                      phoneNumber: item.phoneNumber,
                      educationalLevel: item.educationalLevel,
                      location: item.location,
                    };
                  });
                  ExportConfig.exportToCSV();
                }
              }}
            />
          </div>
        </div>

        <DynamicTable
          columns={usersColumns}
          dataSource={filteredData ?? data}
          loading={isLoading}
          bordered
          scroll={{ x: 0, y: 500 }}
        />
      </Space>
    </>
  );
}
