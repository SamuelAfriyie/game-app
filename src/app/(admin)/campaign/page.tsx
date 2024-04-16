"use client";
import DefaultModal from "@/components/common/default_modal";
import GTable from "@/components/common/general_table";
import MoveButton from "@/components/common/move_button";
import CardTitleWithButton from "@/utils/func/card_title";
import { Button, Card, Form, Space } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { ReactNode, useRef, useState } from "react";
import CampaignForm from "./form/campaign_form";
import gamesData, { gamesColumns } from "@/utils/data/games_data";
import campaignData, { campaignColumns } from "@/utils/data/campaign_data";
import { PageTitle } from "@/components/common/page_title";

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
      <PageTitle title="Campaign" />

      <Space direction="vertical" size="small">
        <Space direction="horizontal" size="small" style={{ display: "flex" }}>
          {/* Left Side */}
          <Card title={"Games"} type="inner" size="small" loading={false}>
            <GTable
              columns={gamesColumns}
              dataSource={gamesData}
              rowSelection={handleRowSelection}
              bordered
              pagination={false}
              size="small"
              scroll={{ x: 0, y: 160 }}
            />
          </Card>
          <MoveButton onClick={handleMoveRecords} />
          {/* Right side */}
          <Card title={setTitle()} type="inner" size="small" loading={false}>
            <GTable
              columns={gamesColumns}
              dataSource={selectedRecordsFx}
              rowSelection={{}}
              bordered
              size="small"
              pagination={false}
              scroll={{ x: 0, y: 160 }}
            />
          </Card>
        </Space>
        <section className="mt-3">
          <GTable
            columns={campaignColumns}
            dataSource={campaignData}
            bordered
            size="small"
            scroll={{ x: 0, y: 290 }}
          />
        </section>
      </Space>
    </>
  );
}
