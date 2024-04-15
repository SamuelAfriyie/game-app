"use client";
import DefaultModal from "@/components/common/default_modal";
import GTable from "@/components/common/general_table";
import MoveButton from "@/components/common/move_button";
import CardTitleWithButton from "@/utils/func/card_title";
import { testColumns, testData } from "@/utils/test/datagrid_test_data";
import { gameTestColumns, gameTestData } from "@/utils/test/game_test_data";
import { Button, Card, Form, Space } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { ReactNode, useRef, useState } from "react";
import CampaignForm from "./form/campaign_form";

export default function Campaign() {
  const selectedRecords = useRef<any>([]);
  const [form] = Form.useForm();
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
      <DefaultModal
        open={open}
        setOpen={setOpen}
        form={form}
        content={<CampaignForm form={form} />}
        title="Create Campaign"
      />
      <h1 className="mb-3">Campaign </h1>

      <Space direction="vertical" size="small" style={{ display: "flex" }}>
        <Space direction="horizontal" size="small" style={{ display: "flex" }}>
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
              // scroll={{ x: 0, y: 500 }}
            />
          </Card>
        </Space>
        <section className="h-[50%] mt-3">
          <GTable columns={testColumns} dataSource={testData} bordered />
        </section>
      </Space>
    </>
  );
}
