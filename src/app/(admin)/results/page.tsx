"use client";
import DefaultModal from "@/components/common/default_modal";
import { ExpandableTable } from "@/components/common/expandable_table";
import GTable from "@/components/common/general_table";
import { PageTitle } from "@/components/common/page_title";
import gameResultsData, {
  gameResultsColumns,
} from "@/utils/data/game_results_data";
import Space from "antd/es/space";
import { useState } from "react";

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
        <PageTitle title="Game Results" />
        <GTable
          columns={gameResultsColumns}
          dataSource={gameResultsData(() => setOpen(true))}
          bordered
          scroll={{ x: 0, y: 500 }}
        />
      </Space>
    </>
  );
}
