"use client";
import DefaultModal from "@/components/common/default_modal";
import GTable from "@/components/common/general_table";
import MoveButton from "@/components/common/move_button";
import CardTitleWithButton from "@/utils/func/card_title";
import { gameTestColumns, gameTestData } from "@/utils/test/game_test_data";
import { Button, Card, Space } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { ReactNode, useRef, useState } from "react";

export default function Campaign() {
  const selectedRecords = useRef<any>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedRecordsFx, setSelectedRecordsFx] = useState<any>([]);

  const setTitle = (): ReactNode => {
    return (
      <CardTitleWithButton
        title="Campaign"
        btnLable="Create Campaign"
        onClick={() => setOpen(true)}
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
      <DefaultModal open={open} setOpen={setOpen} />
      <h1 className="mb-4">Campaign </h1>
      <Space
        direction="horizontal"
        className="h-auto"
        size="small"
        style={{ display: "flex" }}
      >
        {/* Left Side */}
        <Card
          title={"Games"}
          type="inner"
          size="small"
          loading={false}
          style={{ minHeight: "auto" }}
        >
          <GTable
            columns={gameTestColumns}
            dataSource={gameTestData}
            rowSelection={handleRowSelection}
            bordered
            pagination={false}
            scroll={{ x: 0, y: 700 }}
          />
        </Card>
        <MoveButton onClick={handleMoveRecords} />
        {/* Right side */}
        <Card
          title={setTitle()}
          // style={{ minHeight: 450 }}
          style={{ minHeight: "auto" }}
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
            scroll={{ x: 0, y: 500 }}
          />
        </Card>
      </Space>
    </>
  );
}
