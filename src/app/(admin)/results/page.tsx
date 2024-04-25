"use client";
import DefaultModal from "@/components/common/default_modal";
import { ExpandableTable } from "@/components/common/expandable_table"; 
import { PageTitle } from "@/components/common/page_title";
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
        <DynamicTable
          columns={gameResultsColumns}
          dataSource={gameResultsData(() => setOpen(true))}
          bordered
          scroll={{ x: 0, y: 500 }}
        />
      </Space>
    </>
  );
}
