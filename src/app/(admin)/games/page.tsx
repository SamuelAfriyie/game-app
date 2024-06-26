"use client";
import DefaultModal from "@/components/common/default_modal";
import { PageTitle } from "@/components/common/page_title";
import { UseGames } from "@/hooks/common/use_games";
import { gamesColumns } from "@/utils/data/games_data";
import { Card, Input, Space } from "antd";
import dynamic from "next/dynamic";
import React, { useRef } from "react";
import { ReactNode, Suspense } from "react";
import GameForm from "./_form/game_form";
import { GameFormType } from "@/lib/zod/formvalidations";
import { FilledButton } from "@/components/common/buttons";
import { ExportConfig } from "@/utils/data/file_export_config";
import { BiSolidFileExport } from "react-icons/bi";

const DynamicTable = dynamic(() => import("@/components/common/general_table"));

export default function Games() {
  const { data, isLoading, isError } = UseGames({ autoRefresh: true });
  const [fiteredGames, setFilteredGames] = React.useState<any[]>([]);
  const selectedGame = useRef<GameFormType>({
    Title: "",
    Difficulty: "",
    PointAllocated: "",
    RateOfCompletion: "",
  });
  const [open, setOpen] = React.useState<boolean>(false);

  const setTitle = (onChange: (key: string) => void): ReactNode => {
    return (
      <div className="flex justify-end">
        <div className="space-x-3 my-2">
          <Input
            placeholder="Filter"
            style={{ width: 400 }}
            className="h-10"
            onChange={(e) => onChange(e.target?.value)}
          />
          <FilledButton
            icon={<BiSolidFileExport size={13} />}
            text="Export CSV"
            onClick={() => {
              if (data.length > 0) {
                ExportConfig.init = data.map((item: any) => {
                  return {
                    Title: item.Title,
                    Difficulty: item.Difficulty,
                    PointAllocated: item.PointAllocated,
                    RateOfCompletion: item.RateOfCompletion,
                  };
                });
                ExportConfig.exportToCSV();
              }
            }}
          />
        </div>
      </div>
    );
  };

  const filteredList = (key: string) => {
    const fiter = data.filter((item: any) => {
      return item.Title.toLowerCase().includes(key.toLowerCase());
    });
    setFilteredGames(fiter);
  };

  const onRow = (record: GameFormType) => {
    return {
      onDoubleClick: () => {
        selectedGame.current = record;
        setOpen(true);
      },
    };
  };

  return (
    <>
      <DefaultModal
        open={open}
        setOpen={setOpen}
        content={
          <GameForm
            handleCancel={() => setOpen(false)}
            selectedRecord={{ ...selectedGame.current }}
          />
        }
        title="Update Game"
      />
      <div className="flex flex-col h-full w-full">
        <PageTitle title="Games" />
        <div className=" h-full lg:w-[70%] overflow-y-auto">
          <Card
            title={setTitle(filteredList)}
            type="inner"
            size="small"
            loading={false}
            // style={{ minHeight: 650 }}
          >
            <Suspense>
              <DynamicTable
                columns={gamesColumns}
                dataSource={fiteredGames.length === 0 ? data : fiteredGames}
                bordered
                scroll={{ x: 0, y: 500 }}
                loading={isLoading}
                onRow={onRow}
              />
            </Suspense>
          </Card>
        </div>
      </div>
    </>
  );
}
