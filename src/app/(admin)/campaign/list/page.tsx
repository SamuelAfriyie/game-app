"use client";
import { useCampaign } from "@/hooks/common/use_campaign";
import campaignData, { campaignColumns } from "@/utils/data/campaign_data";
import { Card } from "antd";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const DynamicTable = dynamic(() => import("@/components/common/general_table"));

export default function CampaignsList() {
  const { data, isLoading, isError } = useCampaign();
  
  return (
    <>
      <section className="flex mt-3 justify-end w-[70%]">
        <Suspense>
          <Card
            title={"Campaigns List"}
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
            />
          </Card>
        </Suspense>
      </section>
    </>
  );
}
