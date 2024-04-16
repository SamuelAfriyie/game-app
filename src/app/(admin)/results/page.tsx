import GTable from "@/components/common/general_table";
import { PageTitle } from "@/components/common/page_title";
import gameResultsData, {
  gameResultsColumns,
} from "@/utils/data/game_results_data";
import Space from "antd/es/space";

export default function Result() {
  return (
    <>
      <Space direction="vertical" size="small" style={{ display: "flex" }}>
        <PageTitle title="Game Results" />
        <GTable
          columns={gameResultsColumns}
          dataSource={gameResultsData}
          bordered
          scroll={{ x: 0, y: 500 }}
        />
      </Space>
    </>
  );
}
