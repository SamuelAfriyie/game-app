"use client";
import DefaultModal from "@/components/common/default_modal";
import MoveButton from "@/components/common/move_button";
import CardTitleWithButton from "@/utils/func/card_title";
import { Card, Space } from "antd";
import { TableRowSelection } from "antd/es/table/interface";
import { ReactNode, useEffect, useRef, useState } from "react";
import { campaignGamesColumns } from "@/utils/data/games_data";
import { PageTitle } from "@/components/common/page_title";
import CampaignFormV3 from "./_form/campaign_form_v3";
import { UseGames } from "@/hooks/common/use_games";
import GTable from "@/components/common/general_table";
import { useCampaignData } from "@/utils/db/useUpdateCampaign";

export default function Campaign() {
  const { data, isLoading, isError } = UseGames({ autoRefresh: false });
  const selectedRecords = useRef<any>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedGames, setselectedGames] = useState<any>([]);
  const leftGridKey = useRef<number>(0);
  const rightGridKey = useRef<number>(0);
  const isUpdateMode = useCampaignData(
    (state) => state.campaignData.isUpdateMode
  );
  const selectedData = useCampaignData((state) => state.campaignData.campaign);

  const setTitle = (): ReactNode => {
    return (
      <CardTitleWithButton
        title="Campaign"
        btnLable="Create Campaign"
        btnLable2="View Campaigns"
        disabled={selectedGames.length === 0 ? true : false}
        isUpdateMode={isUpdateMode}
        onClick={() => setOpen(true)}
      />
    );
  };

  const checkIfCampaignExist = (id: string) => {
    return selectedGames.find((record: any) => record.id === id);
  };

  const filterSelectedRecords = () => {
    return selectedRecords.current.filter(
      (record: any) => !checkIfCampaignExist(record.id)
    );
  };

  const handleMoveRecords = () => {
    const filteredRecords = filterSelectedRecords();
    setselectedGames([...selectedGames, ...filteredRecords]);
    handleRefresh("L");
  };

  const handleRowSelection: TableRowSelection<any> = {
    onSelect: (record, selected, selectedRows, nativeEvent) => {
      selectedRecords.current = selectedRows;
    },
    onSelectAll: (selected, selectedRows, changeRow) => {
      selectedRecords.current = selectedRows;
    },
  };

  const handleRefresh = (side: "L" | "R") => {
    if (side === "L") {
      leftGridKey.current = leftGridKey.current + 1;
    } else {
      rightGridKey.current = rightGridKey.current + 1;
    }
  };

  const handleRightRowSelection: TableRowSelection<any> = {
    onSelect: (record, selected, selectedRows, nativeEvent) => {
      const refreshedList = selectedGames.filter(
        (rec: any) => rec.id !== record.id
      );
      setselectedGames(refreshedList);
      handleRefresh("R");
    },
    onSelectAll: (selected, selectedRows, changeRow) => {
      setselectedGames([]);
      handleRefresh("R");
    },
  };

  useEffect(() => {
    const checkAndPopulate = () => {
      if (isUpdateMode) {
        setselectedGames(selectedData.games);
      }
    };
    checkAndPopulate();
  }, []);

  return (
    <>
      <DefaultModal
        open={open}
        setOpen={setOpen}
        content={
          <CampaignFormV3
            handleCancel={() => setOpen(false)}
            selectedGames={selectedGames}
            isUpdateMode={isUpdateMode}
          />
        }
        title={`${isUpdateMode ? "Update" : "Create"} Campaign`}
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
            key={leftGridKey.current}
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
            key={rightGridKey.current}
            columns={campaignGamesColumns}
            dataSource={selectedGames}
            // rowSelection={{}}
            rowSelection={handleRightRowSelection}
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
