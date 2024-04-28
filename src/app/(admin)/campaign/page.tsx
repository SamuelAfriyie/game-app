"use client";
import DefaultModal from "@/components/common/default_modal"; 
import MoveButton from "@/components/common/move_button";
import CardTitleWithButton from "@/utils/func/card_title";
import { Card,Space } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { ReactNode, useRef, useState } from "react";
import { campaignGamesColumns } from "@/utils/data/games_data";
import { PageTitle } from "@/components/common/page_title";
import CampaignFormV3 from "./_form/campaign_form_v3";
import { UseGames } from "@/hooks/common/use_games";
import GTable from "@/components/common/general_table";
// import dynamic from "next/dynamic";

// const DynamicTable = dynamic(() => import("@/components/common/general_table"));

export default function Campaign() {
  const { data, isLoading, isError } = UseGames();
  const selectedRecords = useRef<any>([]); 
  const [open, setOpen] = useState<boolean>(false);
  const [selectedRecordsFx, setSelectedRecordsFx] = useState<any>([]);

  const setTitle = (): ReactNode => {
    return (
      <CardTitleWithButton
        title="Campaign"
        btnLable="Create Campaign"
        btnLable2="View Campaigns"
        disabled={selectedRecordsFx.length === 0 ? true : false}
        onClick={() => setOpen(true)}
      />
    );
  };

  const handleMoveRecords = () => {
    setSelectedRecordsFx(selectedRecords.current);
  };

  const handleRowSelection: TableRowSelection<any> = {
    onSelect: (record, selected, selectedRows, nativeEvent) => { 
      selectedRecords.current = selectedRows;
    },
    onSelectAll: (selected, selectedRows, changeRow) => { 
      selectedRecords.current = selectedRows;
    },
  };

  return (
    <>
      <DefaultModal
        open={open}
        setOpen={setOpen} 
        content={
          <CampaignFormV3
            handleCancel={() => setOpen(false)}
            selectedRecordsFx={selectedRecordsFx}
          />
        }
        title="Create Campaign"
      />
      <PageTitle title="Campaign" />

      <Space direction="horizontal" size="small" style={{ width: "100%" }}>
        {/* Left Side */}
        <Card
          title={"Games"}
          type="inner"
          size="small"
          loading={false}
          style={{ minHeight: 650 }}
        >
          <GTable
            columns={campaignGamesColumns}
            dataSource={data}
            rowSelection={handleRowSelection}
            bordered
            pagination={false}
            size="small"
            loading={isLoading}
            scroll={{ x: 0, y: 500 }}
          />
        </Card>
        <MoveButton onClick={handleMoveRecords} />
        {/* Right side */}
        <Card
          title={setTitle()}
          type="inner"
          size="small"
          loading={false}
          style={{ minHeight: 650 }}
        >
          <GTable
            columns={campaignGamesColumns}
            dataSource={selectedRecordsFx}
            rowSelection={{}}
            bordered
            size="small"
            pagination={false}
            scroll={{ x: 0, y: 500 }}
            loading={isLoading}
          />
        </Card>
      </Space>
    </>
  );
}
