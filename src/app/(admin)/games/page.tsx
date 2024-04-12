"use client";

import GTable from "@/components/common/general_table";
import MoveButton from "@/components/common/move_button";
import UseMongo from "@/hooks/common/use_mongo";
import CardTitleWithButton from "@/utils/func/card_title";
import { testColumns, testData } from "@/utils/test/datagrid_test_data";
import { gameTestColumns, gameTestData } from "@/utils/test/game_test_data";
import { Card, Space } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { ReactNode, useRef, useState } from "react";

// export const getServerSideProps = async () => {
//   const { success } = UseMongo();
//   alert(success);
// };

export default function Games() {
  const selectedRecords = useRef<any>([]);
  const [selectedRecordsFx, setSelectedRecordsFx] = useState<any>([]);

  const setTitle = (): ReactNode => {
    return (
      <CardTitleWithButton
        title="Campaign"
        btnLable="Save"
        onClick={() => console.log("clicked")}
      />
    );
  };

  const handleMoveRecords = () => {
    setSelectedRecordsFx(selectedRecords.current);
  };

  const handleRowSelection: TableRowSelection<any> = {
    onSelect: (record, selected, selectedRows, nativeEvent) => {
      console.log(selectedRows);
      selectedRecords.current = selectedRows;
    },
    onSelectAll: (selected, selectedRows, changeRow) => {
      console.log(selectedRows);
      selectedRecords.current = selectedRows;
    },
  };

  return (
    <>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Space
          direction="horizontal"
          className="h-[45%] "
          size="small"
          style={{ display: "flex" }}
        >
          {/* Left Side */}
          <Card
            title={"Games"}
            type="inner"
            size="small"
            loading={false}
            style={{ minHeight: 450 }}
          >
            <GTable
              columns={gameTestColumns}
              dataSource={gameTestData}
              rowSelection={handleRowSelection}
              bordered
              pagination={false}
            />
          </Card>
          <MoveButton onClick={handleMoveRecords} />
          {/* Right side */}
          <Card
            title={setTitle()}
            style={{ minHeight: 450 }}
            type="inner"
            size="small"
            loading={false}
          >
            <GTable
              columns={gameTestColumns}
              dataSource={selectedRecordsFx}
              rowSelection={{}}
              bordered
              pagination={false}
            />
          </Card>
        </Space>
        <Space />
        <section className="h-[50%] mt-10">
          <GTable columns={testColumns} dataSource={testData} bordered />
        </section>
      </Space>
    </>
  );
}
