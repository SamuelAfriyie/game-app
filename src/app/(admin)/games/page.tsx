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

const DynamicTable = dynamic(() => import("@/components/common/general_table"));

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
      </div>
    </div>
  );
};

export default function Games() {
  const { data, isLoading, isError } = UseGames();
  const [fiteredGames, setFilteredGames] = React.useState<any[]>([]);
  const selectedGame = useRef<GameFormType>({
    Title: "",
    Difficulty: "",
    PointAllocated: "",
    RateOfCompletion: "",
  });
  const [open, setOpen] = React.useState<boolean>(false);

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
            selectedRecord={{...selectedGame.current}}
          />
        }
        title="Update Game"
      />
      <Space direction="vertical" size="small" style={{ display: "flex" }}>
        <PageTitle title="Games" />
        <div className="w-[70%]">
          <Card
            title={setTitle(filteredList)}
            type="inner"
            size="small"
            loading={false}
            style={{ minHeight: 650 }}
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
      </Space>
    </>
  );
}
