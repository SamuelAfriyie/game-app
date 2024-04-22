import GTable from "@/components/common/general_table";
import campaignData, { campaignColumns } from "@/utils/data/campaign_data";

export default function CampaignsList() {
  return (
    <>
      <section className="flex mt-3 justify-end">
        <GTable
          columns={campaignColumns}
          dataSource={campaignData}
          bordered
          size="small"
          scroll={{ x: 0, y: 490 }}
        />
      </section>
    </>
  );
}
