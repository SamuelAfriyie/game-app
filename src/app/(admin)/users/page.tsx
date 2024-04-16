import GTable from "@/components/common/general_table";
import { PageTitle } from "@/components/common/page_title";
import { usersColumns, usersData } from "@/utils/data/users_data";
import { Space } from "antd";

export default function User() {
  return (
    <>
      <Space direction="vertical" size="small" style={{ display: "flex" }}>
        <PageTitle title="Users" />
        <GTable
          columns={usersColumns}
          dataSource={usersData}
          bordered
          scroll={{ x: 0, y: 500 }}
        />
      </Space>
    </>
  );
}
