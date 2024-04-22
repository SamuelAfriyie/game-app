"use client";
import DefaultModal from "@/components/common/default_modal";
import GTable from "@/components/common/general_table";
import MoveButton from "@/components/common/move_button";
import CardTitleWithButton from "@/utils/func/card_title";
import { Button, Card, Form, Space } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { ReactNode, useRef, useState } from "react";
import gamesData, { gamesColumns } from "@/utils/data/games_data";
import campaignData, { campaignColumns } from "@/utils/data/campaign_data";
import { PageTitle } from "@/components/common/page_title";
import { CampaignFormV2 } from "./_form/campaign_form_v2";
import { CamapaignFormInstance } from "@/lib/zod/form_instances";

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
        btnLable2="View Campaigns"
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
        form={CamapaignFormInstance()}
        content={<CampaignFormV2 handleCancel={() => setOpen(false)} />}
        title="Create Campaign"
      />
      <PageTitle title="Campaign" />

      <Space direction="horizontal" size="small" style={{ width: "100%" }}>
        {/* Left Side */}
        <Card title={"Games"} type="inner" size="small" loading={false} style={{minHeight: 650}}>
          <GTable
            columns={gamesColumns}
            dataSource={gamesData}
            rowSelection={handleRowSelection}
            bordered
            pagination={false}
            size="small"
            scroll={{ x: 0, y: 500 }}
          />
        </Card>
        <MoveButton onClick={handleMoveRecords} />
        {/* Right side */}
        <Card title={setTitle()} type="inner" size="small" loading={false}  style={{minHeight: 650}}>
          <GTable
            columns={gamesColumns}
            dataSource={selectedRecordsFx}
            rowSelection={{}}
            bordered
            size="small"
            pagination={false}
            scroll={{ x: 0, y: 500 }}
          />
        </Card>
      </Space>
    </>
  );
}
