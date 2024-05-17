"use client";
import { UseCampaign } from "@/hooks/common/use_campaign";
import { campaignColumns } from "@/utils/data/campaign_data";
import { Card } from "antd";
import dynamic from "next/dynamic";
import { ReactNode, Suspense } from "react";
import { useCampaignData } from "@/utils/db/useUpdateCampaign";
import { useRouter } from "next/navigation";
import { FilledButton } from "@/components/common/buttons";
import { BiSolidFileExport } from "react-icons/bi";
import { ExportConfig } from "@/utils/data/file_export_config";
import { PageTitle } from "@/components/common/page_title";

const DynamicTable = dynamic(() => import("@/components/common/general_table"));

export default function CampaignsList() {
  const router = useRouter();
  const { data, isLoading, isError } = UseCampaign();
  const setSelectedGame = useCampaignData((state) => state.setCampaignData);
  const onRow = (record: any) => {
    return {
      onDoubleClick: () => {
        setSelectedGame(record);
        router.push(`/campaign`);
      },
    };
  };

  const setTitle = (): ReactNode => {
    return (
      <div className="flex justify-between items-center">
        <PageTitle title="Campaigns List" />
        <div className="my-2">
          <FilledButton
            icon={<BiSolidFileExport size={13} />}
            text="Export CSV"
            onClick={() => {
              if (data.length > 0) {
                console.log(data);
                ExportConfig.init = data.map((item: any) => {
                  return {
                    name: item.name,
                    duration: item.duration,
                    passScore: item.passScore,
                    numberOfAttempts: item.numberOfAttempts,
                    game: item.games?.map((game: any) => game.Title).join(", "),
                    dateCreated: item.dateCreated,
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

  return (
    <>
      <section className="flex mt-3 justify-end w-[70%]">
        <Suspense>
          <Card
            title={setTitle()}
            type="inner"
            size="small"
            loading={false}
            style={{ minHeight: 650 }}
          >
            <DynamicTable
              columns={campaignColumns}
              dataSource={data}
              bordered
              size="small"
              pagination={false}
              scroll={{ x: 0, y: 490 }}
              loading={isLoading}
              onRow={onRow}
            />
          </Card>
        </Suspense>
      </section>
    </>
  );
}
